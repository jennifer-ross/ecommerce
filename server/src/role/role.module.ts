import { Module } from '@nestjs/common'
import { RoleController } from './role.controller'
import { RoleService } from './role.service'
import { MongooseModule } from '@nestjs/mongoose'
import { RoleCollectionName, RoleSchema } from '../models/role.schema'

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: RoleCollectionName, schema: RoleSchema },
        ]),
    ],
    controllers: [RoleController],
    providers: [RoleService],
})
export class RoleModule {}
