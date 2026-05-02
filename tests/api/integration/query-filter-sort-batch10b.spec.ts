import { test, expect } from '../../helpers';

test.describe('@integration DummyJSON Query Filter Sort Expansion Batch 10B', () => {
    test('products supports combined limit skip select sortBy order', async ({ apiClient }) => {
        const response = await test.step('Act: request products with combined query modifiers', async () => {
            return apiClient.get('/products?limit=5&skip=5&select=title,price,category&sortBy=price&order=desc', 200);
        });

        await test.step('Assert: selected fields and sorting are applied', async () => {
            const body = await response.json();
            expect(Array.isArray(body.products)).toBe(true);
            expect(body.limit).toBe(5);
            expect(body.skip).toBe(5);

            const first = body.products[0] as Record<string, unknown>;
            expect(typeof first.title).toBe('string');
            expect(typeof first.price).toBe('number');
            expect(typeof first.category).toBe('string');
            expect(first.description).toBeUndefined();

            if (body.products.length > 1) {
                const prices = body.products.map((item: { price: number }) => item.price);
                expect(prices[0]).toBeGreaterThanOrEqual(prices[prices.length - 1]);
            }
        });
    });

    test('users supports sortBy and order query', async ({ apiClient }) => {
        const response = await apiClient.get('/users?limit=10&sortBy=firstName&order=asc', 200);
        const body = await response.json();

        expect(Array.isArray(body.users)).toBe(true);
        expect(body.users.length).toBeGreaterThan(0);

        if (body.users.length > 1) {
            const names = body.users.map((item: { firstName: string }) => item.firstName);
            expect(names[0].localeCompare(names[names.length - 1])).toBeLessThanOrEqual(0);
        }
    });

    test('posts supports select query to trim payload', async ({ apiClient }) => {
        const response = await apiClient.get('/posts?limit=3&select=title,userId', 200);
        const body = await response.json();

        expect(Array.isArray(body.posts)).toBe(true);
        expect(body.posts.length).toBeGreaterThan(0);

        const first = body.posts[0] as Record<string, unknown>;
        expect(typeof first.title).toBe('string');
        expect(typeof first.userId).toBe('number');
        expect(first.body).toBeUndefined();
    });

    test('comments supports paging modifiers', async ({ apiClient }) => {
        const response = await apiClient.get('/comments?limit=4&skip=4', 200);
        const body = await response.json();

        expect(Array.isArray(body.comments)).toBe(true);
        expect(body.limit).toBe(4);
        expect(body.skip).toBe(4);
    });
});
