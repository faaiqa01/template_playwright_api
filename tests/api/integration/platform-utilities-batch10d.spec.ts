import { test, expect } from '../../helpers';

test.describe('@integration DummyJSON Platform Utilities Batch 10D', () => {
    test('test endpoint supports all basic HTTP methods', async ({ apiClient }) => {
        const getResponse = await apiClient.get('/test', 200);
        const getBody = await getResponse.json();
        expect(typeof getBody.method).toBe('string');
        expect(getBody.method.toUpperCase()).toBe('GET');

        const postResponse = await apiClient.postJson('/test', { ping: 'pong' }, 200);
        const postBody = await postResponse.json();
        expect(postBody.method.toUpperCase()).toBe('POST');

        const putResponse = await apiClient.putJson('/test', { ping: 'pong' }, 200);
        const putBody = await putResponse.json();
        expect(putBody.method.toUpperCase()).toBe('PUT');

        const patchResponse = await apiClient.patchJson('/test', { ping: 'pong' }, 200);
        const patchBody = await patchResponse.json();
        expect(patchBody.method.toUpperCase()).toBe('PATCH');

        const deleteResponse = await apiClient.delete('/test', 200);
        const deleteBody = await deleteResponse.json();
        expect(deleteBody.method.toUpperCase()).toBe('DELETE');
    });

    test('ip endpoint returns ipv4 or ipv6 value', async ({ apiClient }) => {
        const response = await apiClient.get('/ip', 200);
        const body = await response.json();
        expect(typeof body.ip).toBe('string');
        expect(body.ip.length).toBeGreaterThan(2);
    });

    test('delay query keeps response contract intact', async ({ apiClient }) => {
        const response = await apiClient.get('/products/1?delay=300', 200);
        const body = await response.json();
        expect(body.id).toBe(1);
        expect(typeof body.title).toBe('string');
    });

    test('dynamic image endpoint returns image content type', async ({ request }) => {
        const response = await request.get('https://dummyjson.com/image/320x180/282828/ffffff?text=Batch10D');
        expect(response.status()).toBe(200);

        const contentType = response.headers()['content-type'] ?? '';
        expect(contentType.startsWith('image/')).toBe(true);

        const bytes = await response.body();
        expect(bytes.length).toBeGreaterThan(100);
    });
});
