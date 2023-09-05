import {
    IsBoolean,
    IsDate,
    IsEmail,
    IsOptional,
    IsString,
} from 'class-validator'

export class CreateUserDto {
    @IsString()
    fullName: string

    @IsEmail()
    email: string

    @IsString()
    login: string

    @IsString()
    password: string

    @IsBoolean()
    @IsOptional()
    isValid?: boolean

    @IsOptional()
    @IsDate()
    updateDate?: Date

    @IsDate()
    @IsOptional()
    validateDate?: Date

    @IsOptional()
    roleId: string
}
