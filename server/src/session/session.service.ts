import { Injectable } from '@nestjs/common'
import { Model, Types } from 'mongoose'
import { Session, SessionCollectionName } from '../models/session.schema'
import { InjectModel } from '@nestjs/mongoose'
import { CreateSessionDto } from './dto/create-session.dto'
import { UpdateSessionDto } from './dto/update-session.dto'
import { DeleteResult } from 'mongodb'

@Injectable()
export class SessionService {
    constructor(
        @InjectModel(SessionCollectionName)
        private readonly sessionModel: Model<Session>,
    ) {}

    async findById(id: Types.ObjectId): Promise<Session> {
        return await this.sessionModel.findById(id).exec()
    }

    async findByUserId(userId: Types.ObjectId): Promise<Session[]> {
        return await this.sessionModel.find({ userId }).exec()
    }

    // async findCurrentUserSession(): Promise<any> {}

    async create(createSessionDto: CreateSessionDto): Promise<Session> {
        const session = await new this.sessionModel(createSessionDto)
        return await session.save()
    }

    async deleteById(id: Types.ObjectId): Promise<DeleteResult> {
        return await this.sessionModel.deleteOne({ _id: id }).exec()
    }

    async update(
        id: Types.ObjectId,
        updateSessionDto: UpdateSessionDto,
    ): Promise<Session> {
        return await this.sessionModel
            .findByIdAndUpdate(id, updateSessionDto, { new: true })
            .exec()
    }
}
