import { Injectable } from '@nestjs/common'
import { resolve } from 'path'
import Piscina from 'piscina'
import { generateStringHex, generateStringUtf8 } from './workers'

@Injectable()
export class WorkerPool {
    private pool: Piscina
    constructor() {
        this.pool = new Piscina({
            filename: resolve(__dirname, 'workers/index.js'),
        })
    }

    public async fib(n: number): Promise<number> {
        return await this.pool.run(n, { name: 'fib' })
    }

    public async hashPassword(password: string): Promise<string> {
        return await this.pool.run(password, { name: 'hashPassword' })
    }

    public async comparePassword(
        password: string,
        encrypted: string,
    ): Promise<boolean> {
        return await this.pool.run(
            { password, encrypted },
            {
                name: 'comparePassword',
            },
        )
    }

    public async generateStringHex(len: number): Promise<string> {
        return await this.pool.run(len, {
            name: 'generateStringHex',
        })
    }

    public async generateStringUtf8(len: number): Promise<string> {
        return await this.pool.run(len, {
            name: 'generateStringUtf8',
        })
    }
}
