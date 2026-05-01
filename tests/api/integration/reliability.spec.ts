import { test, expect } from '../../helpers';

test.describe('@integration DummyJSON Reliability Hardening', () => {
    test('repeated GET /products/1 stays stable across attempts', async ({ apiClient }) => {
        const attempts = 3;

        await test.step('Act: call endpoint multiple times', async () => {
            for (let index = 0; index < attempts; index += 1) {
                const response = await apiClient.get('/products/1', 200);
                const body = await response.json();

                await test.step(`Assert attempt ${index + 1}: stable core fields`, async () => {
                    expect(body.id).toBe(1);
                    expect(typeof body.title).toBe('string');
                    expect(typeof body.price).toBe('number');
                });
            }
        });
    });

    test('retry-safe list assertion uses lower bound instead of exact count', async ({ apiClient }) => {
        const response = await apiClient.get('/users?limit=5', 200);
        const body = await response.json();

        expect(Array.isArray(body.users)).toBe(true);
        expect(body.users.length).toBeGreaterThanOrEqual(1);
        expect(typeof body.total).toBe('number');
        expect(body.total).toBeGreaterThan(0);
    });
});
