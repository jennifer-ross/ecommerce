import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ObjectId, model, Types } from 'mongoose'
import { Type } from 'class-transformer'
import { Device, DeviceCollectionName } from './device.schema'
import { RefreshToken, RefreshTokenCollectionName } from './refreshToken.schema'
import { User, UserCollectionName } from './user.schema'
import { DateTime } from 'luxon'

export const SessionCollectionName = 'session_collection'

@Schema({ collection: SessionCollectionName })
export class Session {
    _id: Types.ObjectId

    @Prop({ unique: true })
    sessionToken: string

    @Prop({ type: Types.ObjectId, ref: UserCollectionName, index: true })
    @Type(() => User)
    userId: User

    @Prop({ type: Types.ObjectId, ref: DeviceCollectionName, index: true })
    @Type(() => Device)
    deviceId: Device

    @Prop({
        type: Types.ObjectId,
        ref: RefreshTokenCollectionName,
        index: true,
    })
    @Type(() => RefreshToken)
    refreshTokenId: RefreshToken

    @Prop({ default: DateTime.now().toBSON })
    createdAt: Date

    @Prop({ default: DateTime.now().toBSON })
    updatedAt: Date

    @Prop({ default: null })
    expirationTime: Date
}

export type SessionDocument = Session & Document

export const SessionSchema = SchemaFactory.createForClass(Session)

export const SessionModel = model<Session>(
    Session.name,
    SessionSchema,
    SessionCollectionName,
)
