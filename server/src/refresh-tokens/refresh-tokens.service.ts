import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { User, UserCollectionName } from '../models/user.schema'
import { Model, Types } from 'mongoose'
import { WorkerPool } from '../worker.pool'
import {
    RefreshToken,
    RefreshTokenCollectionName,
} from '../models/refreshToken.schema'
import { CreateRefreshTokenDto } from './dto/create-refresh-token.dto'

@Injectable()
export class RefreshTokensService {
    constructor(
        @InjectModel(UserCollectionName)
        private readonly userModel: Model<User>,
        @InjectModel(RefreshTokenCollectionName)
        private readonly refreshTokenModel: Model<RefreshToken>,
        private readonly pool: WorkerPool,
    ) {}

    async findById(id: Types.ObjectId): Promise<RefreshToken> {
        return await this.refreshTokenModel.findById(id).exec()
    }

    async create(
        createRefreshTokenDto: CreateRefreshTokenDto,
    ): Promise<RefreshToken> {
        const token = await new this.refreshTokenModel(createRefreshTokenDto)
        return await token.save()
    }
}
