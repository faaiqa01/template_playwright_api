import { test, expect } from '../../helpers';

test.describe('@integration DummyJSON Products Integration', () => {
    test('list products then verify first product detail by id', async ({ apiClient }) => {
        const listResponse = await test.step('Act: fetch product list with limit 5', async () => {
            return apiClient.get('/products?limit=5', 200);
        });

        const listBody = await listResponse.json();

        await test.step('Assert: list payload has products', async () => {
            expect(Array.isArray(listBody.products)).toBe(true);
            expect(listBody.products.length).toBeGreaterThan(0);
        });

        const firstProduct = listBody.products[0] as { id: number; title: string };

        const detailResponse = await test.step('Act: fetch product detail using id from list', async () => {
            return apiClient.get(`/products/${firstProduct.id}`, 200);
        });

        await test.step('Assert: detail payload matches list id and title', async () => {
            const detailBody = await detailResponse.json();
            expect(detailBody.id).toBe(firstProduct.id);
            expect(detailBody.title).toBe(firstProduct.title);
        });
    });

    test('search products by keyword returns related items', async ({ apiClient }) => {
        const response = await test.step('Act: search products with query phone', async () => {
            return apiClient.get('/products/search?q=phone', 200);
        });

        await test.step('Assert: search results contain query in title or description', async () => {
            const body = await response.json();
            expect(Array.isArray(body.products)).toBe(true);
            expect(body.products.length).toBeGreaterThan(0);

            const hasQueryMatch = body.products.some((product: { title?: string; description?: string }) => {
                const combined = `${product.title ?? ''} ${product.description ?? ''}`.toLowerCase();
                return combined.includes('phone');
            });

            expect(hasQueryMatch).toBe(true);
        });
    });

    test('get categories returns non-empty category list', async ({ apiClient }) => {
        const response = await apiClient.get('/products/categories', 200);
        const body = await response.json();
        expect(Array.isArray(body)).toBe(true);
        expect(body.length).toBeGreaterThan(0);
    });

    test('unknown product id returns not found response', async ({ apiClient }) => {
        const response = await apiClient.get('/products/999999', 404);
        const body = await response.json();
        expect(typeof body.message).toBe('string');
    });
});

