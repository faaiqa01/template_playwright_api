import { test, expect } from '../../helpers';

test.describe('@smoke DummyJSON Carts Smoke', () => {
    test('GET /carts?limit=1 returns cart list baseline', async ({ apiClient }) => {
        const response = await test.step('Act: request carts with limit 1', async () => {
            return apiClient.get('/carts?limit=1', 200);
        });

        await test.step('Assert: response contains carts and paging fields', async () => {
            const body = await response.json();
            expect(Array.isArray(body.carts)).toBe(true);
            expect(body.carts.length).toBeGreaterThan(0);
            expect(typeof body.total).toBe('number');
            expect(typeof body.limit).toBe('number');
            expect(typeof body.skip).toBe('number');
        });
    });
});

