import { Module } from '@nestjs/common'
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
import { AuthModule } from './auth/auth.module'

@Module({
    imports: [
        DevtoolsModule.register({
            http: process.env.NODE_ENV !== 'production',
        }),
        ThrottlerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                ttl: config.get('THROTTLE_TTL'),
                limit: config.get('THROTTLE_LIMIT'),
            }),
        }),
        // MongooseModule.forRoot('mongodb://localhost:27017/Stream'),
        ConfigModule.forRoot({
            load: [configuration],
        }),
        ServeStaticModule.forRoot({
            rootPath: path.join(__dirname, '..', '..', '..', 'client/dist'),
            exclude: ['/api/(.*)', '/sitemap.xml'],
        }),
        // SitemapModule,
        // ClientModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService, WorkerPool],
})
export class AppModule {}
