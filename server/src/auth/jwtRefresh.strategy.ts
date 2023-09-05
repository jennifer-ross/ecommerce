import { Strategy, ExtractJwt } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from './auth.service'
import configuration from '../config/configuration'
import { FastifyRequest } from 'fastify'

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
    Strategy,
    'jwt-refresh',
) {
    constructor(private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configuration().JWT_REFRESH_SECRET,
            passReqToCallback: true,
        })
    }

    async validate(req: FastifyRequest, payload: any): Promise<any> {
        if (!payload) {
            throw new UnauthorizedException()
        }

        const refreshToken = req.headers['authorization']
            .replace('Bearer', '')
            .trim()

        return { ...payload, refreshToken }
    }
}
