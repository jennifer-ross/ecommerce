import { Logger, Module } from '@nestjs/common'
import { AppController } from '../controllers/app.controller'
import { AppService } from '../services/app.service'
import { DevtoolsModule } from '@nestjs/devtools-integration'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule, ConfigService } from '@nestjs/config'
import configuration from '../config/configuration'
import { ServeStaticModule } from '@nestjs/serve-static'
import { SitemapModule } from './sitemap/sitemap.module'
import * as path from 'path'
import { WorkerPool } from '../worker.pool'
import { ThrottlerModule } from '@nestjs/throttler'
import { AuthModule } from '../auth/auth.module'
import { JwtModule } from '@nestjs/jwt'
import { UsersModule } from '../users/users.module'
import { MigrationsService } from '../migrations/migrations.service'
import { generateRoleActions } from '../utils'
import { User } from '../models/user.schema'
import { Role } from '../models/role.schema'

@Module({
    imports: [
        DevtoolsModule.register({
            http: process.env.NODE_ENV !== 'production',
        }),
        ThrottlerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                ttl: config.get<number>('THROTTLE_TTL'),
                limit: config.get<number>('THROTTLE_LIMIT'),
            }),
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                uri: `mongodb://${config.get<string>('DB_HOST')}`,
                dbName: config.get<string>('DB_NAME'),
                auth: {
                    password: config.get<string>('DB_USERNAME'),
                    username: config.get<string>('DB_PASSWORD'),
                },
                authSource: config.get<string>('DB_NAME'),
                authMechanism: 'DEFAULT',
            }),
        }),
        ConfigModule.forRoot({
            load: [configuration],
        }),
        ServeStaticModule.forRoot({
            rootPath: path.join(__dirname, '..', '..', '..', 'client/dist'),
            exclude: ['/api/(.*)', '/sitemap.xml'],
        }),
        JwtModule.register({
            global: true,
            secret: configuration().JWT_SECRET,
            signOptions: {
                expiresIn: configuration().JWT_EXPIRES,
                algorithm: 'RS256',
            },
        }),
        // SitemapModule,
        // ClientModule,
        AuthModule,
        UsersModule,
    ],
    controllers: [AppController],
    providers: [AppService, WorkerPool, MigrationsService],
})
export class AppModule {
    private readonly logger = new Logger(AppModule.name)

    // configure(consumer: MiddlewareConsumer) {
    //     consumer
    //         .apply(TransformRequestMiddleware)
    //         .forRoutes({ path: '(.*)', method: RequestMethod.ALL })
    // }

    constructor(private migrationService: MigrationsService) {}

    async onModuleInit() {
        await this.migrationService.runMigrationsUp()

        const roleActions = await generateRoleActions([User, Role])

        // console.log(roleActions)
    }
}
