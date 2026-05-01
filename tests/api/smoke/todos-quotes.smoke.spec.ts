import { test, expect } from '../../helpers';

test.describe('@smoke DummyJSON Todos and Quotes Smoke', () => {
    test('GET /todos?limit=1 returns todo list baseline', async ({ apiClient }) => {
        const response = await test.step('Act: request todos with limit 1', async () => {
            return apiClient.get('/todos?limit=1', 200);
        });

        await test.step('Assert: response contains todos and paging fields', async () => {
            const body = await response.json();
            expect(Array.isArray(body.todos)).toBe(true);
            expect(body.todos.length).toBeGreaterThan(0);
            expect(typeof body.total).toBe('number');
            expect(typeof body.limit).toBe('number');
            expect(typeof body.skip).toBe('number');
        });
    });
});

