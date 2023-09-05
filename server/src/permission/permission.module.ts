import { Module } from '@nestjs/common'
import { PermissionService } from './permission.service'
import { MongooseModule } from '@nestjs/mongoose'
import {
    PermissionCollectionName,
    PermissionSchema,
} from '../models/permission.schema'
import { WorkerPool } from '../worker.pool'

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: PermissionCollectionName, schema: PermissionSchema },
        ]),
    ],
    providers: [PermissionService, WorkerPool],
})
export class PermissionModule {}
