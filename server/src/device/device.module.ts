import { Module } from '@nestjs/common'
import { DeviceController } from './device.controller'
import { DeviceService } from './device.service'
import { MongooseModule } from '@nestjs/mongoose'
import { DeviceCollectionName, DeviceSchema } from '../models/device.schema'

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: DeviceCollectionName, schema: DeviceSchema },
        ]),
    ],
    controllers: [DeviceController],
    providers: [DeviceService],
})
export class DeviceModule {}
