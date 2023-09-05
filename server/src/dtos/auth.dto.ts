import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MinLength,
    ValidateIf,
    IsOptional,
} from 'class-validator'

export class LogInDto {
    @MinLength(5)
    @IsEmail()
    @IsOptional()
    email?: string

    @ValidateIf((o) => o.email !== undefined)
    @MinLength(5)
    @IsString()
    @IsOptional()
    login?: string

    @MinLength(8)
    @IsNotEmpty()
    @IsString()
    password: string
}

export class CreateUserDto {}
