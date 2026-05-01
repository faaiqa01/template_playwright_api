import { test, expect } from '../../helpers';

test.describe('@smoke DummyJSON Products Smoke', () => {
    test('GET /products?limit=1 returns product list baseline', async ({ apiClient }) => {
        const response = await test.step('Act: request products with limit 1', async () => {
            return apiClient.get('/products?limit=1', 200);
        });

        await test.step('Assert: response contains products and paging fields', async () => {
            const body = await response.json();
            expect(Array.isArray(body.products)).toBe(true);
            expect(body.products.length).toBeGreaterThan(0);
            expect(typeof body.total).toBe('number');
            expect(typeof body.limit).toBe('number');
            expect(typeof body.skip).toBe('number');
        });
    });
});

