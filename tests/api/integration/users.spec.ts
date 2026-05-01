import { test, expect } from '../../helpers';

test.describe('@integration DummyJSON Users Integration', () => {
    test('list users then validate first user details by id', async ({ apiClient }) => {
        const usersResponse = await test.step('Act: fetch users list with limit 5', async () => {
            return apiClient.get('/users?limit=5', 200);
        });

        const usersBody = await usersResponse.json();

        await test.step('Assert: list response has at least one user', async () => {
            expect(Array.isArray(usersBody.users)).toBe(true);
            expect(usersBody.users.length).toBeGreaterThan(0);
        });

        const firstUser = usersBody.users[0] as { id: number; email: string };

        const singleUserResponse = await test.step('Act: fetch single user by id from list result', async () => {
            return apiClient.get(`/users/${firstUser.id}`, 200);
        });

        await test.step('Assert: single user endpoint returns matching id and email', async () => {
            const singleUserBody = await singleUserResponse.json();
            expect(singleUserBody.id).toBe(firstUser.id);
            expect(singleUserBody.email).toBe(firstUser.email);
        });
    });

    test('search users by username returns related result', async ({ apiClient }) => {
        const response = await test.step('Act: search users with query emily', async () => {
            return apiClient.get('/users/search?q=emily', 200);
        });

        await test.step('Assert: search payload has users and includes emily in key fields', async () => {
            const body = await response.json();
            expect(Array.isArray(body.users)).toBe(true);
            expect(body.users.length).toBeGreaterThan(0);

            const containsQuery = body.users.some((user: { username?: string; firstName?: string; lastName?: string }) => {
                const value = `${user.username ?? ''} ${user.firstName ?? ''} ${user.lastName ?? ''}`.toLowerCase();
                return value.includes('emily');
            });

            expect(containsQuery).toBe(true);
        });
    });

    test('unknown user id returns not found response', async ({ apiClient }) => {
        const response = await apiClient.get('/users/999999', 404);
        const body = await response.json();
        expect(typeof body.message).toBe('string');
    });
});

