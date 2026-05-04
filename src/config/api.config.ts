export interface ApiRuntimeConfig {
    readonly apiBaseUrl: string;
    readonly apiToken?: string;
    readonly requestTimeoutMs: number;
}

const DEFAULT_TIMEOUT_MS = 15_000;

export const apiConfig: ApiRuntimeConfig = {
    apiBaseUrl: process.env.API_BASE_URL ?? 'https://jsonplaceholder.typicode.com',
    apiToken: process.env.API_TOKEN,
    requestTimeoutMs: Number(process.env.API_TIMEOUT_MS ?? DEFAULT_TIMEOUT_MS),
};
