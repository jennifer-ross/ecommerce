import { Injectable, NotFoundException } from '@nestjs/common'
import { User, UserCollectionName } from '../models/user.schema'
import { Model, Types } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { WorkerPool } from '../worker.pool'
import {
    RefreshToken,
    RefreshTokenCollectionName,
} from '../models/refreshToken.schema'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(UserCollectionName)
        private readonly userModel: Model<User>,

        @InjectModel(RefreshTokenCollectionName)
        private readonly RefreshToken: Model<RefreshToken>,
        private readonly pool: WorkerPool,
    ) {}

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec()
    }

    async findById(id: Types.ObjectId): Promise<User> {
        return await this.userModel.findById(id).exec()
    }

    async findByEmail(email: string): Promise<User> {
        return await this.userModel.findOne({ email }).exec()
    }

    async findByLogin(login: string): Promise<User> {
        return await this.userModel.findOne({ login }).exec()
    }

    async createUser(password: string): Promise<void> {
        const hashedPassword = await this.pool.hashPassword(password)

        console.log(hashedPassword)
    }

    async updateUser(
        id: Types.ObjectId,
        updateUserDto: UpdateUserDto,
    ): Promise<User> {
        const existingUser = await this.userModel.findByIdAndUpdate(
            id,
            updateUserDto,
            { new: true },
        )

        if (!existingUser) {
            throw new NotFoundException(`Student #${id} not found`)
        }

        return existingUser
    }
}
