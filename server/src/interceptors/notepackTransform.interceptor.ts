import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common'
import { FastifyRequest } from 'fastify'
import { map, Observable } from 'rxjs'
import notepack from 'notepack.io'

@Injectable()
export class NotepackTransformInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        // const request = context.switchToHttp().getRequest()
        return next.handle().pipe(
            map((response: any) => {
                response = notepack.encode(response)
                return response
            }),
        )
    }
}
