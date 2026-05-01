import { test, expect } from '../../helpers';

test.describe('@smoke DummyJSON Recipes Smoke', () => {
    test('GET /recipes?limit=1 returns recipe list baseline', async ({ apiClient }) => {
        const response = await test.step('Act: request recipes with limit 1', async () => {
            return apiClient.get('/recipes?limit=1', 200);
        });

        await test.step('Assert: response contains recipes and paging fields', async () => {
            const body = await response.json();
            expect(Array.isArray(body.recipes)).toBe(true);
            expect(body.recipes.length).toBeGreaterThan(0);
            expect(typeof body.total).toBe('number');
            expect(typeof body.limit).toBe('number');
            expect(typeof body.skip).toBe('number');
        });
    });
});

