import { APIRequestContext, APIResponse, expect } from '@playwright/test';

export class ApiClient {
    public constructor(private readonly request: APIRequestContext) {}

    public async get(path: string, expectedStatus: number): Promise<APIResponse> {
        const response = await this.request.get(path);
        await expect(response, `GET ${path} should return ${expectedStatus}`).toHaveStatus(expectedStatus);
        return response;
    }

    public async postJson(path: string, payload: unknown, expectedStatus: number): Promise<APIResponse> {
        const response = await this.request.post(path, { data: payload });
        await expect(response, `POST ${path} should return ${expectedStatus}`).toHaveStatus(expectedStatus);
        return response;
    }
}
