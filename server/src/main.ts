import { NestFactory } from '@nestjs/core'
import {
    FastifyAdapter,
    NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { AppModule } from './modules/app.module'
import { AppClusterService } from './services/app-cluster.service'
import compression from '@fastify/compress'
import secureSession from '@fastify/secure-session'
import { eq, lowerCase } from 'lodash'
import fastifyCsrf from '@fastify/csrf-protection'
import * as fs from 'fs'
import * as path from 'path'
import { DateTime } from 'luxon'

async function bootstrap() {
    // Initialisation
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter({ logger: true }),
        {
            rawBody: true,
        },
    )

    // Global Prefix
    await app.setGlobalPrefix('api')

    // Interceptors
    // await app.useGlobalInterceptors(new NotepackTransformInterceptor())

    // Configuration
    await app.enableCors({
        origin: ['http://localhost:5173', 'http://localhost'],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    })
    await app.register(fastifyCsrf)
    await app.register(compression, { encodings: ['gzip', 'deflate'] })
    await app.register(secureSession, {
        secret: 'kRKXKuFMzsN7gZ0tBX1iQjRWQlTRB6PyqDdVNNM6aJ4',
        salt: 'mq9hDxBVDbspDR6n',
        key: fs.readFileSync(path.join(__dirname, '../src/', 'secret-key')),
        logLevel: 'trace',
        cookie: {
            path: '/',
            expires: DateTime.now().plus({ day: 30 }).toBSON(),
            domain: '127.0.0.1',
            secure: true,
            sameSite: 'none',
            httpOnly: false,
            // options for setCookie, see https://github.com/fastify/fastify-cookie
        },
    })

    // BodyParsers
    // const notePackParser = (request: FastifyRequest, rawBody: Buffer, done) => {
    //     try {
    //         const body = notepack.decode(rawBody) as object
    //         request.body = body
    //
    //         done(null, body)
    //     } catch (e) {
    //         done(e)
    //     }
    // }
    //
    // await app.useBodyParser(
    //     'application/x-www-form-urlencoded',
    //     {},
    //     notePackParser,
    // )

    // Start
    await app.listen(3000)
}

// Clusterize if enabled
if (
    process.env.USE_CLUSTERS &&
    (eq(lowerCase(process.env.USE_CLUSTERS), 'true') ||
        eq(process.env.USE_CLUSTERS, '1'))
) {
    AppClusterService.clusterize(bootstrap)
} else {
    bootstrap()
}
