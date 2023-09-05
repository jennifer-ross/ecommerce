import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateRefreshTokenDto {
    @IsNotEmpty()
    @IsString()
    value: string

    @IsDate()
    @IsNotEmpty()
    createdAt: Date

    @IsDate()
    @IsOptional()
    expiresAt?: Date
}
