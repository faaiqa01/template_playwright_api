import { test, expect } from '../../helpers';

test.describe('@integration DummyJSON Todos and Quotes Integration', () => {
    test('list todos then validate detail and completion field', async ({ apiClient }) => {
        const listResponse = await test.step('Act: fetch todo list with limit 5', async () => {
            return apiClient.get('/todos?limit=5', 200);
        });

        const listBody = await listResponse.json();

        await test.step('Assert: todo list has at least one item', async () => {
            expect(Array.isArray(listBody.todos)).toBe(true);
            expect(listBody.todos.length).toBeGreaterThan(0);
        });

        const firstTodo = listBody.todos[0] as { id: number; completed: boolean };

        const detailResponse = await test.step('Act: fetch todo detail by id from list', async () => {
            return apiClient.get(`/todos/${firstTodo.id}`, 200);
        });

        await test.step('Assert: detail id matches and completed is boolean', async () => {
            const detailBody = await detailResponse.json();
            expect(detailBody.id).toBe(firstTodo.id);
            expect(typeof detailBody.completed).toBe('boolean');
        });
    });

    test('GET /todos/random returns random todo payload', async ({ apiClient }) => {
        const response = await apiClient.get('/todos/random', 200);
        const body = await response.json();
        expect(typeof body.id).toBe('number');
        expect(typeof body.todo).toBe('string');
        expect(typeof body.completed).toBe('boolean');
    });

    test('GET /quotes returns non-empty quote list', async ({ apiClient }) => {
        const response = await apiClient.get('/quotes?limit=5', 200);
        const body = await response.json();
        expect(Array.isArray(body.quotes)).toBe(true);
        expect(body.quotes.length).toBeGreaterThan(0);
    });

    test('unknown todo id returns not found response', async ({ apiClient }) => {
        const response = await apiClient.get('/todos/999999', 404);
        const body = await response.json();
        expect(typeof body.message).toBe('string');
    });
});

