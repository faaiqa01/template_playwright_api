import { test, expect } from '../../helpers';

test.describe('@integration DummyJSON Carts Integration', () => {
    test('list carts then verify detail and carts by user', async ({ apiClient }) => {
        const listResponse = await test.step('Act: fetch carts list with limit 5', async () => {
            return apiClient.get('/carts?limit=5', 200);
        });

        const listBody = await listResponse.json();

        await test.step('Assert: list contains at least one cart', async () => {
            expect(Array.isArray(listBody.carts)).toBe(true);
            expect(listBody.carts.length).toBeGreaterThan(0);
        });

        const firstCart = listBody.carts[0] as { id: number; userId: number; totalQuantity: number };

        const detailResponse = await test.step('Act: fetch cart detail by id from list', async () => {
            return apiClient.get(`/carts/${firstCart.id}`, 200);
        });

        await test.step('Assert: detail matches key fields from list cart', async () => {
            const detailBody = await detailResponse.json();
            expect(detailBody.id).toBe(firstCart.id);
            expect(detailBody.userId).toBe(firstCart.userId);
            expect(detailBody.totalQuantity).toBe(firstCart.totalQuantity);
        });

        const byUserResponse = await test.step('Act: fetch carts by user id from selected cart', async () => {
            return apiClient.get(`/carts/user/${firstCart.userId}`, 200);
        });

        await test.step('Assert: carts by user contains selected cart id', async () => {
            const byUserBody = await byUserResponse.json();
            expect(Array.isArray(byUserBody.carts)).toBe(true);
            const hasSelectedCart = byUserBody.carts.some((cart: { id: number }) => cart.id === firstCart.id);
            expect(hasSelectedCart).toBe(true);
        });
    });

    test('add new cart returns created payload summary', async ({ apiClient }) => {
        const response = await test.step('Act: create cart with two products', async () => {
            return apiClient.postJson(
                '/carts/add',
                {
                    userId: 1,
                    products: [
                        { id: 144, quantity: 2 },
                        { id: 98, quantity: 1 },
                    ],
                },
                201,
            );
        });

        await test.step('Assert: created cart has computed totals', async () => {
            const body = await response.json();
            expect(body.userId).toBe(1);
            expect(Array.isArray(body.products)).toBe(true);
            expect(body.products.length).toBe(2);
            expect(typeof body.total).toBe('number');
            expect(typeof body.discountedTotal).toBe('number');
            expect(typeof body.totalQuantity).toBe('number');
            expect(body.totalQuantity).toBeGreaterThan(0);
        });
    });

    test('add cart with invalid payload returns 400', async ({ apiClient }) => {
        const response = await apiClient.postJson(
            '/carts/add',
            {
                userId: 1,
                products: 'invalid-products-type',
            },
            400,
        );

        const body = await response.json();
        expect(typeof body.message).toBe('string');
    });
});

