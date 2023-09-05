import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Req,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { LogInDto } from '../dtos/auth.dto'
import { FastifyRequest } from 'fastify'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post()
    async auth(@Req() request: FastifyRequest, @Body() loginData: LogInDto) {
        const { session, headers, ip } = request

        return await this.authService.signIn(
            session,
            headers,
            ip,
            loginData.password,
            loginData.login,
            loginData.email,
        )
    }
}
