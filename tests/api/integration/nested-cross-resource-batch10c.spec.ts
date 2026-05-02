import { test, expect } from '../../helpers';

test.describe('@integration DummyJSON Nested Cross Resource Batch 10C', () => {
    test('user nested resources carts posts todos are accessible', async ({ apiClient }) => {
        const userId = 1;

        const cartsResponse = await test.step('Act: get user carts', async () => {
            return apiClient.get(`/users/${userId}/carts`, 200);
        });
        const cartsBody = await cartsResponse.json();
        expect(Array.isArray(cartsBody.carts)).toBe(true);

        const postsResponse = await test.step('Act: get user posts', async () => {
            return apiClient.get(`/users/${userId}/posts`, 200);
        });
        const postsBody = await postsResponse.json();
        expect(Array.isArray(postsBody.posts)).toBe(true);

        const todosResponse = await test.step('Act: get user todos', async () => {
            return apiClient.get(`/users/${userId}/todos`, 200);
        });
        const todosBody = await todosResponse.json();
        expect(Array.isArray(todosBody.todos)).toBe(true);
    });

    test('posts by user endpoint aligns with post userId', async ({ apiClient }) => {
        const userId = 2;
        const response = await apiClient.get(`/posts/user/${userId}?limit=5`, 200);
        const body = await response.json();

        expect(Array.isArray(body.posts)).toBe(true);
        if (body.posts.length > 0) {
            const invalid = body.posts.some((item: { userId: number }) => item.userId !== userId);
            expect(invalid).toBe(false);
        }
    });

    test('comments by post endpoint aligns with postId', async ({ apiClient }) => {
        const postId = 1;
        const response = await apiClient.get(`/comments/post/${postId}`, 200);
        const body = await response.json();

        expect(Array.isArray(body.comments)).toBe(true);
        if (body.comments.length > 0) {
            const invalid = body.comments.some((item: { postId: number }) => item.postId !== postId);
            expect(invalid).toBe(false);
        }
    });

    test('nested endpoint with unknown user returns not found', async ({ apiClient }) => {
        const response = await apiClient.get('/users/999999/posts', 404);
        const body = await response.json();
        expect(typeof body.message).toBe('string');
    });
});
