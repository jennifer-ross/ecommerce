import { Types } from 'mongoose'
import { IsDate, IsMongoId, IsNotEmpty, IsString } from 'class-validator'

export class CreateSessionDto {
    @IsString()
    @IsNotEmpty()
    sessionToken: string

    @IsNotEmpty()
    @IsMongoId()
    deviceId: Types.ObjectId

    @IsNotEmpty()
    @IsMongoId()
    userId: Types.ObjectId

    @IsNotEmpty()
    @IsMongoId()
    refreshTokenId: Types.ObjectId

    @IsNotEmpty()
    @IsDate()
    createdAt: Date

    @IsNotEmpty()
    @IsDate()
    updatedAt: Date

    @IsNotEmpty()
    @IsDate()
    expirationTime: Date
}
