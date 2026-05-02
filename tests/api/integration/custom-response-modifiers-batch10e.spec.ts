import { test, expect } from '../../helpers';

test.describe('@integration DummyJSON Custom Response Query Modifiers Batch 10E', () => {
    test('products supports multi-parameter custom response shape', async ({ apiClient }) => {
        const response = await apiClient.get(
            '/products?limit=3&skip=2&select=title,price,rating&sortBy=rating&order=desc',
            200,
        );
        const body = await response.json();

        expect(Array.isArray(body.products)).toBe(true);
        expect(body.limit).toBe(3);
        expect(body.skip).toBe(2);

        if (body.products.length > 0) {
            const first = body.products[0] as Record<string, unknown>;
            expect(typeof first.title).toBe('string');
            expect(typeof first.price).toBe('number');
            expect(typeof first.rating).toBe('number');
            expect(first.description).toBeUndefined();
        }
    });

    test('users supports select and sort in same request', async ({ apiClient }) => {
        const response = await apiClient.get('/users?limit=5&select=firstName,age&sortBy=age&order=asc', 200);
        const body = await response.json();

        expect(Array.isArray(body.users)).toBe(true);
        expect(body.users.length).toBeGreaterThan(0);

        const first = body.users[0] as Record<string, unknown>;
        expect(typeof first.firstName).toBe('string');
        expect(typeof first.age).toBe('number');
        expect(first.email).toBeUndefined();
    });

    test('posts supports select + sort + paging combo', async ({ apiClient }) => {
        const response = await apiClient.get('/posts?limit=4&skip=1&select=title,reactions&sortBy=reactions&order=desc', 200);
        const body = await response.json();

        expect(Array.isArray(body.posts)).toBe(true);
        expect(body.limit).toBe(4);
        expect(body.skip).toBe(1);

        if (body.posts.length > 0) {
            const first = body.posts[0] as Record<string, unknown>;
            expect(typeof first.title).toBe('string');

            const reactions = first.reactions as Record<string, unknown>;
            expect(typeof reactions.likes).toBe('number');
            expect(typeof reactions.dislikes).toBe('number');
        }
    });

    test('todos supports select + paging combo', async ({ apiClient }) => {
        const response = await apiClient.get('/todos?limit=4&skip=2&select=todo,completed', 200);
        const body = await response.json();

        expect(Array.isArray(body.todos)).toBe(true);
        expect(body.limit).toBe(4);
        expect(body.skip).toBe(2);

        if (body.todos.length > 0) {
            const first = body.todos[0] as Record<string, unknown>;
            expect(typeof first.todo).toBe('string');
            expect(typeof first.completed).toBe('boolean');
            expect(typeof first.userId).toBe('number');
        }
    });

    test('recipes supports sort and paging combo', async ({ apiClient }) => {
        const response = await apiClient.get('/recipes?limit=5&skip=0&sortBy=rating&order=desc', 200);
        const body = await response.json();

        expect(Array.isArray(body.recipes)).toBe(true);
        expect(body.limit).toBe(5);

        if (body.recipes.length > 1) {
            const ratings = body.recipes.map((item: { rating: number }) => item.rating);
            expect(ratings[0]).toBeGreaterThanOrEqual(ratings[ratings.length - 1]);
        }
    });
});
