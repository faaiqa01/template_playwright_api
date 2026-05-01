import { test, expect } from '../../helpers';

test.describe('@smoke DummyJSON Users Smoke', () => {
    test('GET /users?limit=1 returns basic user list payload', async ({ apiClient }) => {
        const response = await test.step('Act: request users with small limit', async () => {
            return apiClient.get('/users?limit=1', 200);
        });

        await test.step('Assert: response contains users array and paging fields', async () => {
            const body = await response.json();
            expect(Array.isArray(body.users)).toBe(true);
            expect(body.users.length).toBeGreaterThan(0);
            expect(typeof body.total).toBe('number');
            expect(typeof body.limit).toBe('number');
            expect(typeof body.skip).toBe('number');
        });
    });
});

