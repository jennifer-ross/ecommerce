import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { LocalStrategy } from './local.strategy'
import { JwtStrategy } from './jwt.strategy'
import { PassportModule } from '@nestjs/passport'
import { UsersService } from '../users/users.service'
import { MongooseModule } from '@nestjs/mongoose'
import { UserCollectionName, UserSchema } from '../models/user.schema'
import { WorkerPool } from '../worker.pool'
import {
    RefreshTokenCollectionName,
    RefreshTokenSchema,
} from '../models/refreshToken.schema'
import { RefreshTokensService } from '../refresh-tokens/refresh-tokens.service'
import { DeviceService } from '../device/device.service'
import { DeviceCollectionName, DeviceSchema } from '../models/device.schema'
import { SessionCollectionName, SessionSchema } from '../models/session.schema'
import { SessionService } from '../session/session.service'
import { JwtRefreshStrategy } from './jwtRefresh.strategy'

@Module({
    imports: [
        PassportModule.register({ session: true }),
        MongooseModule.forFeature([
            { name: UserCollectionName, schema: UserSchema },
        ]),
        MongooseModule.forFeature([
            { name: RefreshTokenCollectionName, schema: RefreshTokenSchema },
        ]),
        MongooseModule.forFeature([
            { name: DeviceCollectionName, schema: DeviceSchema },
        ]),
        MongooseModule.forFeature([
            { name: SessionCollectionName, schema: SessionSchema },
        ]),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
        JwtRefreshStrategy,
        UsersService,
        WorkerPool,
        RefreshTokensService,
        DeviceService,
        SessionService,
    ],
})
export class AuthModule {}
