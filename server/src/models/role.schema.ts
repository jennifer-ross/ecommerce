import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ObjectId, model } from 'mongoose'

export const RoleCollectionName = 'role_collection'

@Schema({ collection: RoleCollectionName })
export class Role {
    _id: ObjectId

    @Prop({ unique: true })
    roleName: string

    @Prop({ default: new Date() })
    createdAt: Date
}

export type RoleDocument = Role & Document

export const RoleSchema = SchemaFactory.createForClass(Role)

export const RoleModel = model<Role>(Role.name, RoleSchema, RoleCollectionName)
