import { APIRequestContext, APIResponse, expect } from '@playwright/test';

export class ApiClient {
    public constructor(private readonly request: APIRequestContext) {}

    public async get(path: string, expectedStatus: number): Promise<APIResponse> {
        const response = await this.request.get(path);
        expect(response.status(), `GET ${path} should return ${expectedStatus}`).toBe(expectedStatus);
        return response;
    }

    public async getWithHeaders(
        path: string,
        headers: Record<string, string>,
        expectedStatus: number,
    ): Promise<APIResponse> {
        const response = await this.request.get(path, { headers });
        expect(response.status(), `GET ${path} should return ${expectedStatus}`).toBe(expectedStatus);
        return response;
    }

    public async postJson(path: string, payload: unknown, expectedStatus: number): Promise<APIResponse> {
        const response = await this.request.post(path, { data: payload });
        expect(response.status(), `POST ${path} should return ${expectedStatus}`).toBe(expectedStatus);
        return response;
    }

    public async postWithHeaders(
        path: string,
        payload: unknown,
        headers: Record<string, string>,
        expectedStatus: number,
    ): Promise<APIResponse> {
        const response = await this.request.post(path, {
            data: payload,
            headers,
        });
        expect(response.status(), `POST ${path} should return ${expectedStatus}`).toBe(expectedStatus);
        return response;
    }

    public async putJson(path: string, payload: unknown, expectedStatus: number): Promise<APIResponse> {
        const response = await this.request.put(path, { data: payload });
        expect(response.status(), `PUT ${path} should return ${expectedStatus}`).toBe(expectedStatus);
        return response;
    }

    public async patchJson(path: string, payload: unknown, expectedStatus: number): Promise<APIResponse> {
        const response = await this.request.patch(path, { data: payload });
        expect(response.status(), `PATCH ${path} should return ${expectedStatus}`).toBe(expectedStatus);
        return response;
    }

    public async delete(path: string, expectedStatus: number): Promise<APIResponse> {
        const response = await this.request.delete(path);
        expect(response.status(), `DELETE ${path} should return ${expectedStatus}`).toBe(expectedStatus);
        return response;
    }

    public async getWithToken(path: string, token: string, expectedStatus: number): Promise<APIResponse> {
        const response = await this.request.get(path, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        expect(response.status(), `GET ${path} should return ${expectedStatus}`).toBe(expectedStatus);
        return response;
    }
}
