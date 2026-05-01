import { test, expect } from '../../helpers';

test.describe('@smoke DummyJSON Smoke', () => {
    test('GET /products/1 returns product baseline', async ({ apiClient }) => {
        const response = await test.step('Act: call product endpoint', async () => {
            return apiClient.get('/products/1', 200);
        });

        await test.step('Assert: response includes core product fields', async () => {
            const body = await response.json();
            expect(body).toMatchObject({ id: 1 });
            expect(typeof body.title).toBe('string');
            expect(typeof body.price).toBe('number');
        });
    });
});

