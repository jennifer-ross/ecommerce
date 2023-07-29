import {
    PipeTransform,
    Injectable,
    ArgumentMetadata,
    BadRequestException,
} from '@nestjs/common'
import notepack from 'notepack.io'
import { toString } from 'lodash'

@Injectable()
export class NotepackPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if (metadata.type) {
            return toString(notepack.decode(value))
        }

        throw new BadRequestException('Notepack decode failed')
    }
}
