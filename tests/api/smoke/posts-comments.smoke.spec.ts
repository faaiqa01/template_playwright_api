import { test, expect } from '../../helpers';

test.describe('@smoke DummyJSON Posts and Comments Smoke', () => {
    test('GET /posts?limit=1 returns post list baseline', async ({ apiClient }) => {
        const response = await test.step('Act: request posts with limit 1', async () => {
            return apiClient.get('/posts?limit=1', 200);
        });

        await test.step('Assert: response contains posts and paging fields', async () => {
            const body = await response.json();
            expect(Array.isArray(body.posts)).toBe(true);
            expect(body.posts.length).toBeGreaterThan(0);
            expect(typeof body.total).toBe('number');
            expect(typeof body.limit).toBe('number');
            expect(typeof body.skip).toBe('number');
        });
    });
});

