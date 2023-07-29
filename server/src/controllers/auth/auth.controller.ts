import { Controller, Post, Req, Request, UsePipes } from '@nestjs/common'
import { FastifyRequest } from 'fastify'
import { NotepackPipe } from '../../pipes/notepack.pipe'

@Controller('auth')
export class AuthController {
    @Post()
    auth(@Req() request: FastifyRequest) {
        // console.log(request)
    }
}
