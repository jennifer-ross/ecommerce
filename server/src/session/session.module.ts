import { Module } from '@nestjs/common'
import { SessionController } from './session.controller'
import { SessionService } from './session.service'
import { MongooseModule } from '@nestjs/mongoose'
import { SessionCollectionName, SessionSchema } from '../models/session.schema'

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: SessionCollectionName, schema: SessionSchema },
        ]),
    ],
    controllers: [SessionController],
    providers: [SessionService],
})
export class SessionModule {}
