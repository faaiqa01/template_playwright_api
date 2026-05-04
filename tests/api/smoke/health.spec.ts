import { test, expect } from '../../helpers';

test.describe('API Smoke', () => {
    test('GET /posts/1 returns stable baseline response', async ({ apiClient }) => {
        await test.step('Arrange: select baseline endpoint', async () => {
            // No dynamic setup needed for this smoke check.
        });

        const response = await test.step('Act: call GET /posts/1', async () => {
            return apiClient.get('/posts/1', 200);
        });

        await test.step('Assert: verify minimal health and payload', async () => {
            const body = await response.json();
            expect(body).toMatchObject({ id: 1, userId: 1 });
            expect(typeof body.title).toBe('string');
        });
    });
});
