import { test, expect } from '../../helpers';

type PostContract = {
    userId: number;
    id: number;
    title: string;
    body: string;
};

const assertPostContract = (payload: unknown): asserts payload is PostContract => {
    const record = payload as Record<string, unknown>;
    expect(typeof record.userId).toBe('number');
    expect(typeof record.id).toBe('number');
    expect(typeof record.title).toBe('string');
    expect(typeof record.body).toBe('string');
};

test.describe('API Contract', () => {
    test('GET /posts/1 matches PostContract schema', async ({ apiClient }) => {
        const response = await apiClient.get('/posts/1', 200);
        const body = await response.json();
        assertPostContract(body);
    });
});
