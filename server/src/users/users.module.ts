import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserSchema, UserCollectionName } from '../models/user.schema'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { WorkerPool } from '../worker.pool'
import {
    RefreshTokenCollectionName,
    RefreshTokenSchema,
} from '../models/refreshToken.schema'
import { RefreshTokensService } from '../refresh-tokens/refresh-tokens.service'

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: UserCollectionName, schema: UserSchema },
        ]),
        MongooseModule.forFeature([
            { name: RefreshTokenCollectionName, schema: RefreshTokenSchema },
        ]),
    ],
    providers: [UsersService, WorkerPool, RefreshTokensService],
    controllers: [UsersController],
    exports: [UsersService],
})
export class UsersModule {}
