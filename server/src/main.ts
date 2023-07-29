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
import { NotepackPipe } from './pipes/notepack.pipe'
import { FastifyRequest } from 'fastify'

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter({ logger: true }),
    )
    await app.setGlobalPrefix('api')

    await app.useGlobalPipes(new NotepackPipe())

    await app.enableCors()

    await app.register(compression, { encodings: ['gzip', 'deflate'] })
    await app.register(secureSession, {
        secret: 'averylogphrasebiggerthanthirtytwochars',
        salt: 'mq9hDxBVDbspDR6n',
    })

    await app.useBodyParser(
        'application/x-www-form-urlencoded',
        {},
        (request: FastifyRequest) => {},
    )

    await app.listen(3000)
}

if (
    process.env.USE_CLUSTERS &&
    (eq(lowerCase(process.env.USE_CLUSTERS), 'true') ||
        eq(process.env.USE_CLUSTERS, '1'))
) {
    AppClusterService.clusterize(bootstrap)
} else {
    bootstrap()
}
