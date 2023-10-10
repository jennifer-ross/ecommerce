import { makeAutoObservable } from 'mobx'
import { inject } from '../../helpers/serviceManager'

import SessionService from './SessionService'
import ErrorService, { OfflineError } from './ErrorService'

import { API_ORIGIN, API_TOKEN } from '../../config'

import TYPES from '../types'

export type JSON = Record<string, unknown>

export class ApiService {
    readonly sessionService = inject<SessionService>(TYPES.sessionService)
    readonly errorService = inject<ErrorService>(TYPES.errorService)

    constructor() {
        makeAutoObservable(this)
    }

    private handleSearchParams = <D = JSON>(url: URL, params?: D) => {
        if (params) {
            for (const [key, value] of Object.entries(params)) {
                if (typeof value === 'object') {
                    url.searchParams.set(key, JSON.stringify(value))
                } else if (typeof value === 'number') {
                    url.searchParams.set(key, value.toString())
                } else if (typeof value === 'string') {
                    url.searchParams.set(key, value.toString())
                } else {
                    throw new Error(`Unknown param type ${key}`)
                }
            }
        }
    }

    private handleJSON = <T = JSON>(data: string): T => {
        try {
            return JSON.parse(data) as T
        } catch {
            return {} as T
        }
    }

    private request = <T = JSON, D = JSON>(
        method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
        url: URL,
        data?: D,
    ) =>
        new Promise<T>(async (res, rej) => {
            try {
                const request = await fetch(url.toString(), {
                    method,
                    headers: {
                        ...(this.sessionService.sessionId && {
                            [API_TOKEN]: this.sessionService.sessionId,
                        }),
                        'Content-type': 'application/json',
                    },
                    ...(data && {
                        body: JSON.stringify(data),
                    }),
                })
                const text = await request.text()
                const json = this.handleJSON<T>(text)
                this.errorService.processStatusCode(request.status)
                if ('error' in (json as JSON)) {
                    rej(json)
                } else {
                    res(json)
                }
            } catch (e) {
                if (!window.navigator.onLine) {
                    e = new OfflineError()
                }
                this.errorService.handleError(e as Error)
                rej(e)
            }
        })

    public get = <T = JSON, D = JSON>(
        url: URL | string,
        data?: D,
    ): Promise<T> => {
        const targetUrl =
            typeof url === 'string' ? new URL(url, API_ORIGIN) : url
        this.handleSearchParams<D>(targetUrl, data)
        return this.request<T>('GET', targetUrl)
    }

    public remove = <T = JSON, D = JSON>(
        url: URL | string,
        data?: D,
    ): Promise<T> => {
        const targetUrl =
            typeof url === 'string' ? new URL(url, API_ORIGIN) : url
        this.handleSearchParams<D>(targetUrl, data)
        return this.request<T, D>('DELETE', targetUrl)
    }

    public post = <T = JSON, D = JSON>(
        url: URL | string,
        data?: D,
    ): Promise<T> => {
        if (typeof url === 'string') {
            return this.request<T, D>('POST', new URL(url, API_ORIGIN), data)
        }
        return this.request<T, D>('POST', url, data)
    }

    public put = <T = JSON, D = JSON>(
        url: URL | string,
        data?: D,
    ): Promise<T> => {
        if (typeof url === 'string') {
            return this.request<T, D>('PUT', new URL(url, API_ORIGIN), data)
        }
        return this.request<T, D>('PUT', url, data)
    }

    public patch = <T = JSON, D = JSON>(
        url: URL | string,
        data?: D,
    ): Promise<T> => {
        if (typeof url === 'string') {
            return this.request<T, D>('PATCH', new URL(url, API_ORIGIN), data)
        }
        return this.request<T, D>('PATCH', url, data)
    }
}

export default ApiService
