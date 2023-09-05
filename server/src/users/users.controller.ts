import { Body, Controller, Get, Param, Post, Patch, Req } from '@nestjs/common'
import { UsersService } from './users.service'
import { Types } from 'mongoose'
import { QueryIdDto } from '../dtos/query.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { FastifyRequest } from 'fastify'

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    @Get()
    async getAll(@Req() req: FastifyRequest) {
        return await this.usersService.findAll()
    }
    @Get(':id')
    async getUser(@Param() params: QueryIdDto) {
        return await this.usersService.findById(new Types.ObjectId(params.id))
    }
    @Post()
    async createUser(@Body('password') password: string) {
        return await this.usersService.createUser(password)
    }
    @Patch(':id')
    async updateUser(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        return await this.usersService.updateUser(
            new Types.ObjectId(id),
            updateUserDto,
        )
    }
}
