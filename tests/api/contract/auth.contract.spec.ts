import { dummyJsonLoginFixture } from '../../../src/fixtures';
import { test, expect } from '../../helpers';

type DummyJsonAuthLoginContract = {
    id: number;
    username: string;
    email: string;
    accessToken: string;
    refreshToken: string;
};

const assertAuthLoginContract: (payload: unknown) => asserts payload is DummyJsonAuthLoginContract = (
    payload: unknown,
): asserts payload is DummyJsonAuthLoginContract => {
    const record = payload as Record<string, unknown>;
    expect(typeof record.id).toBe('number');
    expect(typeof record.username).toBe('string');
    expect(typeof record.email).toBe('string');
    expect(typeof record.accessToken).toBe('string');
    expect(typeof record.refreshToken).toBe('string');
};

test.describe('@contract DummyJSON Auth Contract', () => {
    test('POST /auth/login matches auth login contract', async ({ apiClient }) => {
        const response = await apiClient.postJson('/auth/login', dummyJsonLoginFixture, 200);
        const body = await response.json();
        assertAuthLoginContract(body);
    });
});

