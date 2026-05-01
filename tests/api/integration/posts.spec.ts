import { buildPostPayload } from '../../../src/fixtures';
import { test, expect } from '../../helpers';

test.describe('API Integration', () => {
    test('POST /posts returns created payload contract', async ({ apiClient }) => {
        const payload = buildPostPayload();

        const response = await test.step('Act: create a post', async () => {
            return apiClient.postJson('/posts', payload, 201);
        });

        await test.step('Assert: created response includes echoed body and id', async () => {
            const body = await response.json();
            expect(body).toMatchObject(payload);
            expect(body).toHaveProperty('id');
        });
    });

    test('GET unknown resource returns 404', async ({ apiClient }) => {
        const response = await apiClient.get('/posts/999999', 404);
        const bodyText = await response.text();
        expect(bodyText).toBeTruthy();
    });
});
