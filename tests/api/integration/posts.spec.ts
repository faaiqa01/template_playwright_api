import { dummyJsonLoginFixture } from '../../../src/fixtures';
import { test, expect } from '../../helpers';

test.describe('@integration DummyJSON Integration', () => {
    test('POST /auth/login then GET /auth/me with returned token', async ({ apiClient }) => {
        const loginResponse = await test.step('Act: login with valid credentials', async () => {
            return apiClient.postJson('/auth/login', dummyJsonLoginFixture, 200);
        });

        const loginBody = await loginResponse.json();

        await test.step('Assert: login response includes access token', async () => {
            expect(loginBody.username).toBe(dummyJsonLoginFixture.username);
            expect(typeof loginBody.accessToken).toBe('string');
            expect(loginBody.accessToken.length).toBeGreaterThan(20);
        });

        const meResponse = await test.step('Act: call /auth/me using bearer token', async () => {
            return apiClient.getWithToken('/auth/me', loginBody.accessToken as string, 200);
        });

        await test.step('Assert: /auth/me returns same authenticated user', async () => {
            const meBody = await meResponse.json();
            expect(meBody.username).toBe(dummyJsonLoginFixture.username);
            expect(typeof meBody.email).toBe('string');
        });
    });

    test('POST /auth/login with invalid password returns 400', async ({ apiClient }) => {
        const response = await apiClient.postWithHeaders(
            '/auth/login',
            {
                username: dummyJsonLoginFixture.username,
                password: 'wrong-password',
                expiresInMins: 30,
            },
            {
                'Content-Type': 'application/json',
            },
            400,
        );

        const body = await response.json();
        expect(typeof body.message).toBe('string');
    });
});

