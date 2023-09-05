import { Module } from '@nestjs/common'
import { RefreshTokensService } from './refresh-tokens.service'
import { RefreshTokensController } from './refresh-tokens.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { UserCollectionName, UserSchema } from '../models/user.schema'
import {
    RefreshTokenCollectionName,
    RefreshTokenSchema,
} from '../models/refreshToken.schema'
import { WorkerPool } from '../worker.pool'

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: UserCollectionName, schema: UserSchema },
            { name: RefreshTokenCollectionName, schema: RefreshTokenSchema },
        ]),
    ],
    providers: [RefreshTokensService, WorkerPool],
    controllers: [RefreshTokensController],
    exports: [RefreshTokensService],
})
export class RefreshTokensModule {}
