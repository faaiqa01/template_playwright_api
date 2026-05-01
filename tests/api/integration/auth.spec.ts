import { dummyJsonLoginFixture } from '../../../src/fixtures';
import { test, expect } from '../../helpers';

test.describe('@integration DummyJSON Auth Integration', () => {
    test('login success then get auth user then refresh token', async ({ apiClient }) => {
        const loginResponse = await test.step('Act: login with valid credentials', async () => {
            return apiClient.postJson('/auth/login', dummyJsonLoginFixture, 200);
        });

        const loginBody = await loginResponse.json();

        await test.step('Assert: login returns access and refresh token', async () => {
            expect(loginBody.username).toBe(dummyJsonLoginFixture.username);
            expect(typeof loginBody.accessToken).toBe('string');
            expect(typeof loginBody.refreshToken).toBe('string');
            expect(loginBody.accessToken.length).toBeGreaterThan(20);
            expect(loginBody.refreshToken.length).toBeGreaterThan(20);
        });

        const meResponse = await test.step('Act: call /auth/me using access token', async () => {
            return apiClient.getWithToken('/auth/me', loginBody.accessToken as string, 200);
        });

        await test.step('Assert: /auth/me returns current user profile', async () => {
            const meBody = await meResponse.json();
            expect(meBody.username).toBe(dummyJsonLoginFixture.username);
            expect(typeof meBody.email).toBe('string');
            expect(typeof meBody.firstName).toBe('string');
        });

        const refreshResponse = await test.step('Act: refresh auth session with refresh token', async () => {
            return apiClient.postJson(
                '/auth/refresh',
                {
                    refreshToken: loginBody.refreshToken,
                    expiresInMins: dummyJsonLoginFixture.expiresInMins,
                },
                200,
            );
        });

        await test.step('Assert: refresh returns new token pair', async () => {
            const refreshBody = await refreshResponse.json();
            expect(typeof refreshBody.accessToken).toBe('string');
            expect(typeof refreshBody.refreshToken).toBe('string');
            expect(refreshBody.accessToken.length).toBeGreaterThan(20);
        });
    });

    test('login with invalid password returns 400', async ({ apiClient }) => {
        const response = await apiClient.postJson(
            '/auth/login',
            {
                username: dummyJsonLoginFixture.username,
                password: 'wrong-password',
                expiresInMins: dummyJsonLoginFixture.expiresInMins,
            },
            400,
        );

        const body = await response.json();
        expect(typeof body.message).toBe('string');
    });

    test('auth me without token returns unauthorized', async ({ apiClient }) => {
        const response = await apiClient.getWithHeaders('/auth/me', { Authorization: '' }, 401);
        const body = await response.json();
        expect(typeof body.message).toBe('string');
    });
});

