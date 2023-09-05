import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ObjectId, model } from 'mongoose'

export const PermissionCollectionName = 'permission_collection'

@Schema({ collection: PermissionCollectionName })
export class Permission {
    _id: ObjectId

    @Prop({ unique: true })
    permissionName: string
}

export type PermissionDocument = Permission & Document

export const PermissionSchema = SchemaFactory.createForClass(Permission)

export const PermissionModel = model<Permission>(
    Permission.name,
    PermissionSchema,
    PermissionCollectionName,
)
