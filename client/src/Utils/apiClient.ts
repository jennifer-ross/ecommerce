import axios, { AxiosHeaders, AxiosInstance, AxiosRequestConfig } from 'axios'

export class ApiClient {
    constructor(
        private readonly baseUrl: string,
        private readonly headers: AxiosHeaders,
        private readonly authToken: string = '',
    ) {}

    public async get(
        endpoint = '',
        params?: any,
        signal?: AbortSignal,
    ): Promise<any> {
        try {
            const client = this.createClient(params)
            const response = await client.get(endpoint, {
                signal: signal,
                responseType: 'json',
                withCredentials: true,
            })
            return response.data
        } catch (error: any) {
            this.handleError(error)
        }
    }

    public async post(
        endpoint = '',
        data?: any,
        signal?: AbortSignal,
    ): Promise<any> {
        try {
            const client = this.createClient()
            const response = await client.post(endpoint, data, {
                signal: signal,
                responseType: 'json',
                withCredentials: true,
            })
            return response.data
        } catch (error) {
            this.handleError(error)
        }
    }

    public async patch(
        endpoint = '',
        data?: any,
        signal?: AbortSignal,
    ): Promise<any> {
        try {
            const client = this.createClient()
            const response = await client.patch(endpoint, data, {
                signal: signal,
                responseType: 'json',
                withCredentials: true,
            })
            return response.data
        } catch (error) {
            this.handleError(error)
        }
    }

    public async uploadFile(endpoint = '', formData: FormData): Promise<any> {
        try {
            const client = this.createClient()
            const response = await client.post(endpoint, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                responseType: 'json',
                withCredentials: true,
            })
            return response.data
        } catch (error) {
            this.handleError(error)
        }
    }

    private createClient(params: object = {}): AxiosInstance {
        const config: AxiosRequestConfig = {
            baseURL: this.baseUrl,
            headers: this.headers,
            params: params,
        }
        if (this.authToken) {
            config.headers = {
                Authorization: `Bearer ${this.authToken}`,
            }
        }
        return axios.create(config)
    }

    private handleError(error: any): void {
        if (!error.response) {
            // throw new HttpError(error.message)
        } else if (error.response.status === 401) {
            // throw new Unauthorized(error.response.data)
            // } else if (error.response.status === 403) {
            //     throw new Forbidden(error.response.data)
        } else {
            throw error
        }
    }

    get apiBaseUrl(): string {
        return this.baseUrl
    }
}
