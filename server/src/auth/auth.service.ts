import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import { WorkerPool } from '../worker.pool'
import { RefreshTokensService } from '../refresh-tokens/refresh-tokens.service'
import { User } from '../models/user.schema'
import { Session } from '@fastify/secure-session'
import { DeviceService } from '../device/device.service'
import { Device } from '../models/device.schema'
import { isEqual } from 'lodash'
import { SessionService } from '../session/session.service'
import { Session as UserSession } from '../models/session.schema'
import { IncomingHttpHeaders } from 'http'
import configuration from '../config/configuration'
import { RefreshToken } from '../models/refreshToken.schema'
import { DateTime } from 'luxon'

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UsersService,
        private readonly refreshTokenService: RefreshTokensService,
        private readonly deviceService: DeviceService,
        private readonly sessionService: SessionService,
        private readonly pool: WorkerPool,
    ) {}

    async signUp() {}

    async signIn(
        session: Session,
        headers: IncomingHttpHeaders,
        ip: string,
        password: string,
        login?: string,
        email?: string,
    ) {
        const isEmail = login === undefined && typeof login !== 'string'

        const user = isEmail
            ? await this.userService.findByEmail(email)
            : await this.userService.findByLogin(login)

        if (!user) {
            throw new BadRequestException('User does not exist')
        }

        if (!(await this.validateUser(user, password))) {
            throw new BadRequestException('Password is incorrect')
        }

        const tokens = await this.getTokens(user)
        const currentDevice = await this.getDevice(user, headers, ip)

        if (!currentDevice) {
            throw new BadRequestException('UserAgent is incorrect')
        }

        const refreshToken = await this.getRefreshToken(tokens.refreshToken)

        if (!refreshToken) {
            throw new BadRequestException('Cannot create refresh token')
        }

        const currentSession = await this.getSession(
            user,
            currentDevice,
            refreshToken,
        )

        if (!currentSession) {
            throw new BadRequestException('Cannot create user session')
        }

        await this.updateSession(session, user, currentSession)

        return tokens
    }

    async updateSession(
        session: Session,
        user: User,
        userSession: UserSession,
    ): Promise<void> {
        session.set('sessionToken', userSession.sessionToken)
        session.set('userId', user._id.toString())
    }

    async getRefreshToken(refreshTokenStr: string): Promise<RefreshToken> {
        return await this.refreshTokenService.create({
            createdAt: DateTime.now().toBSON(),
            value: refreshTokenStr,
            expiresAt: DateTime.now().plus({ day: 15 }).toBSON(),
        })
    }

    async getDevice(
        user: User,
        headers: IncomingHttpHeaders,
        ip: string,
    ): Promise<Device> {
        const userDevices = await this.deviceService.findByUserId(user._id)
        const deviceData = await this.deviceService.detect(headers)
        let currentDevice: Device = null

        if (userDevices.length > 0) {
            currentDevice = userDevices.find(
                (device) =>
                    isEqual(device.deviceData, deviceData) && device.ip === ip,
            )
        }

        if (!currentDevice) {
            currentDevice = await this.deviceService.create({
                deviceData: deviceData,
                createdAt: DateTime.now().toBSON(),
                userId: user._id,
                ip: ip,
            })
        }

        return currentDevice
    }

    async getSession(
        user: User,
        device: Device,
        refreshToken: RefreshToken,
    ): Promise<UserSession> {
        const userSessions = await this.sessionService.findByUserId(user._id)
        let currentSession: UserSession = null

        if (userSessions.length > 0) {
            currentSession = userSessions.find(
                (session) =>
                    session.deviceId._id.toString() === device._id.toString() &&
                    session.expirationTime &&
                    DateTime.fromJSDate(session.expirationTime) >
                        DateTime.now(),
            )

            if (currentSession) {
                currentSession = await this.sessionService.update(
                    currentSession._id,
                    {
                        refreshTokenId: refreshToken._id,
                        updatedAt: DateTime.now().toBSON(),
                        expirationTime: DateTime.now()
                            .plus({ day: 14, hour: 23 })
                            .toBSON(),
                    },
                )
            }
        }

        if (!currentSession) {
            const sessionToken = await this.pool.generateStringUtf8(64)

            currentSession = await this.sessionService.create({
                deviceId: device._id,
                createdAt: DateTime.now().toBSON(),
                updatedAt: DateTime.now().toBSON(),
                sessionToken,
                expirationTime: DateTime.now()
                    .plus({ day: 14, hour: 23 })
                    .toBSON(),
                refreshTokenId: refreshToken._id,
                userId: user._id,
            })
        }

        for (const session of userSessions) {
            if (
                (session.expirationTime &&
                    DateTime.fromJSDate(session.expirationTime) <=
                        DateTime.now()) ||
                !session.expirationTime
            ) {
                await this.sessionService.deleteById(session._id)
            }
        }

        return currentSession
    }

    async getTokens(
        user: User,
    ): Promise<{ accessToken: string; refreshToken: string }> {
        const payload = {
            _id: user._id.toString(),
            login: user.login,
            role: user.roleId,
        }

        return {
            accessToken: await this.jwtService.signAsync(payload, {
                issuer: configuration().SITE_URL,
                audience: configuration().SITE_URL,
                expiresIn: '30m',
                jwtid: await this.pool.generateStringUtf8(32),
                subject: user._id.toString(),
                privateKey: configuration().JWT_SECRET,
            }),
            refreshToken: await this.jwtService.signAsync(payload, {
                issuer: configuration().SITE_URL,
                audience: configuration().SITE_URL,
                expiresIn: '15d',
                secret: configuration().JWT_REFRESH_SECRET,
                privateKey: configuration().JWT_REFRESH_SECRET,
                jwtid: await this.pool.generateStringUtf8(32),
                subject: user._id.toString(),
            }),
        }
    }

    async validateUser(user: User, password: string): Promise<boolean> {
        return await this.pool.comparePassword(password, user.password)
    }
}
