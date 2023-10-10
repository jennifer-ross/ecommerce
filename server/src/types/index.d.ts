/// <reference types="node" />
import 'fastify'

declare module 'fastify' {
    /**
     * FastifyRequest is an instance of the standard http or http2 request objects.
     * It defaults to http.IncomingMessage, and it also extends the relative request object.
     */
    interface FastifyRequest {
        user: any
    }
}
