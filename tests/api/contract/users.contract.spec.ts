import { test, expect } from '../../helpers';

type DummyJsonUserContract = {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
};

const assertUserContract: (payload: unknown) => asserts payload is DummyJsonUserContract = (
    payload: unknown,
): asserts payload is DummyJsonUserContract => {
    const record = payload as Record<string, unknown>;
    expect(typeof record.id).toBe('number');
    expect(typeof record.username).toBe('string');
    expect(typeof record.email).toBe('string');
    expect(typeof record.firstName).toBe('string');
    expect(typeof record.lastName).toBe('string');
    expect(typeof record.gender).toBe('string');
};

test.describe('@contract DummyJSON Users Contract', () => {
    test('GET /users/1 matches user contract', async ({ apiClient }) => {
        const response = await apiClient.get('/users/1', 200);
        const body = await response.json();
        assertUserContract(body);
    });
});

