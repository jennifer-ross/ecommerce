import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { model, Types } from 'mongoose'
import { Type } from 'class-transformer'
import { RefreshToken } from './refreshToken.schema'

export const UserCollectionName = 'users_collection'

@Schema({ collection: UserCollectionName })
export class User {
    _id: Types.ObjectId

    @Prop()
    fullName: string

    @Prop({ unique: true, lowercase: true })
    email: string

    @Prop({ unique: true })
    login: string

    @Prop()
    password: string

    @Prop({ default: false })
    isValid: boolean

    @Prop({ default: new Date() })
    createdDate: Date

    @Prop({ default: null })
    updateDate: Date

    @Prop({ default: null })
    validateDate: Date

    @Prop({ default: null })
    roleId: string
}

export type UserDocument = User & Document

export const UserSchema = SchemaFactory.createForClass(User)

export const UserModel = model<User>(User.name, UserSchema, UserCollectionName)
