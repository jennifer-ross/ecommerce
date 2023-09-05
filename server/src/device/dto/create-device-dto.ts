import { IDevice } from '../types'
import { Types } from 'mongoose'
import { IsIP, IsMongoId, IsNotEmpty, IsString } from 'class-validator'

export class CreateDeviceDto {
    @IsNotEmpty()
    deviceData: IDevice

    @IsMongoId()
    @IsNotEmpty()
    userId: Types.ObjectId

    @IsString()
    @IsNotEmpty()
    @IsIP()
    ip: string

    @IsString()
    @IsNotEmpty()
    createdAt: Date
}
