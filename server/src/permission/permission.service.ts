import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { WorkerPool } from '../worker.pool'
import {
    Permission,
    PermissionCollectionName,
} from '../models/permission.schema'
import { CreatePermissionDto } from './dto/create-permission.dto'
import { DeleteResult } from 'mongodb'

@Injectable()
export class PermissionService {
    constructor(
        @InjectModel(PermissionCollectionName)
        private readonly permissionModel: Model<Permission>,
        private readonly pool: WorkerPool,
    ) {}

    async create(
        createPermissionDto: CreatePermissionDto,
    ): Promise<Permission> {
        const permission = await new this.permissionModel(createPermissionDto)
        return await permission.save()
    }

    async deleteAll(): Promise<DeleteResult> {
        return await this.permissionModel.deleteMany().exec()
    }
}
