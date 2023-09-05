export class IDevice {
    os: IDeviceOs
    client: IDeviceClient
    device: IDeviceHardware
}

export interface IDeviceHardware {
    id: string
    type: string
    brand: string
    model: string
    code: string
}

export interface IDeviceClient {
    type: string
    name: string
    short_name: string
    version: string
    engine: string
    engine_version: string
    family: string
}

export interface IDeviceOs {
    name: string
    short_name: string
    version: string
    platform: string
    family: string
}
