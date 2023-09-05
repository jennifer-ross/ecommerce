import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ObjectId, model, Types } from 'mongoose'
import { User, UserCollectionName } from './user.schema'
import { Type } from 'class-transformer'
import { IDevice } from '../device/types'

export const DeviceCollectionName = 'device_collection'

@Schema({ collection: DeviceCollectionName })
export class Device {
    _id: Types.ObjectId

    @Prop()
    @Type(() => IDevice)
    deviceData: IDevice

    @Prop({ type: Types.ObjectId, ref: UserCollectionName, index: true })
    @Type(() => User)
    userId: User

    @Prop()
    ip: string

    @Prop({ default: new Date() })
    createdAt: Date
}

export type DeviceDocument = Device & Document

export const DeviceSchema = SchemaFactory.createForClass(Device)

export const DeviceModel = model<Device>(
    Device.name,
    DeviceSchema,
    DeviceCollectionName,
)
