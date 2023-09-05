import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ObjectId, model, Types } from 'mongoose'
import { User } from './user.schema'
import { Type } from 'class-transformer'

export const RefreshTokenCollectionName = 'refresh_token_collection'

@Schema({ collection: RefreshTokenCollectionName })
export class RefreshToken {
    _id: Types.ObjectId

    @Prop({ required: true, unique: true })
    value: string

    @Prop({ default: new Date() })
    createdAt: Date

    @Prop({ default: null, required: true })
    expiresAt: Date
}

export type RefreshTokenDocument = RefreshToken & Document

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken)

export const RefreshTokenModel = model<RefreshToken>(
    RefreshToken.name,
    RefreshTokenSchema,
    RefreshTokenCollectionName,
)
