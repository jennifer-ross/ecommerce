import { Injectable } from '@nestjs/common'
import DeviceDetector from 'node-device-detector'
import ClientHints, { JSONObject } from 'node-device-detector/client-hints'
import { IDevice } from './types'
import { Model, Types } from 'mongoose'
import { Device, DeviceCollectionName } from '../models/device.schema'
import { InjectModel } from '@nestjs/mongoose'
import { CreateDeviceDto } from './dto/create-device-dto'
import { IncomingHttpHeaders } from 'http'

@Injectable()
export class DeviceService {
    private readonly detector: DeviceDetector = new DeviceDetector({
        clientIndexes: true,
        deviceIndexes: true,
        deviceAliasCode: true,
    })

    constructor(
        @InjectModel(DeviceCollectionName)
        private readonly deviceModel: Model<Device>,
    ) {}

    async detect(headers: IncomingHttpHeaders): Promise<IDevice> {
        const clientHints = new ClientHints()

        return this.detector.detect(
            headers['user-agent'],
            clientHints.parse(headers),
        ) as IDevice
    }

    async findById(id: Types.ObjectId): Promise<Device> {
        return await this.deviceModel.findById(id).exec()
    }

    async findByUserId(userId: Types.ObjectId): Promise<Device[]> {
        return await this.deviceModel
            .find({
                userId,
            })
            .exec()
    }

    async create(createDeviceDto: CreateDeviceDto): Promise<Device> {
        const device = await new this.deviceModel(createDeviceDto)
        return await device.save()
    }
}
