import { ApiClient } from './apiClient'
import { AxiosHeaders } from 'axios'

export class ApiClientFactory {
    constructor(
        private readonly baseUrl: string,
        private readonly headers: AxiosHeaders,
    ) {}

    public createClient(): ApiClient {
        return new ApiClient(this.baseUrl, this.headers)
    }

    public createAuthorizedClient(authToken: string): ApiClient {
        return new ApiClient(this.baseUrl, this.headers, authToken)
    }
}
