import { test, expect } from '../../helpers';

test.describe('@integration DummyJSON Posts and Comments Integration', () => {
    test('list posts then validate post detail and its comments relation', async ({ apiClient }) => {
        const postsResponse = await test.step('Act: fetch posts list with limit 5', async () => {
            return apiClient.get('/posts?limit=5', 200);
        });

        const postsBody = await postsResponse.json();

        await test.step('Assert: list contains posts', async () => {
            expect(Array.isArray(postsBody.posts)).toBe(true);
            expect(postsBody.posts.length).toBeGreaterThan(0);
        });

        const firstPost = postsBody.posts[0] as { id: number; title: string; userId: number };

        const detailResponse = await test.step('Act: fetch post detail by id', async () => {
            return apiClient.get(`/posts/${firstPost.id}`, 200);
        });

        await test.step('Assert: detail matches list post id and title', async () => {
            const detailBody = await detailResponse.json();
            expect(detailBody.id).toBe(firstPost.id);
            expect(detailBody.title).toBe(firstPost.title);
            expect(detailBody.userId).toBe(firstPost.userId);
        });

        const commentsResponse = await test.step('Act: fetch comments by post id', async () => {
            return apiClient.get(`/posts/${firstPost.id}/comments`, 200);
        });

        await test.step('Assert: all comments are linked to selected post id', async () => {
            const commentsBody = await commentsResponse.json();
            expect(Array.isArray(commentsBody.comments)).toBe(true);

            const invalidLink = commentsBody.comments.some(
                (comment: { postId: number }) => comment.postId !== firstPost.id,
            );

            expect(invalidLink).toBe(false);
        });
    });

    test('search posts by keyword returns related content', async ({ apiClient }) => {
        const response = await test.step('Act: search posts with query love', async () => {
            return apiClient.get('/posts/search?q=love', 200);
        });

        await test.step('Assert: search result includes query in title or body', async () => {
            const body = await response.json();
            expect(Array.isArray(body.posts)).toBe(true);
            expect(body.posts.length).toBeGreaterThan(0);

            const hasMatch = body.posts.some((post: { title?: string; body?: string }) => {
                const combined = `${post.title ?? ''} ${post.body ?? ''}`.toLowerCase();
                return combined.includes('love');
            });

            expect(hasMatch).toBe(true);
        });
    });

    test('unknown post id returns not found response', async ({ apiClient }) => {
        const response = await apiClient.get('/posts/999999', 404);
        const body = await response.json();
        expect(typeof body.message).toBe('string');
    });

    test('GET /comments returns non-empty comment list', async ({ apiClient }) => {
        const response = await apiClient.get('/comments?limit=5', 200);
        const body = await response.json();
        expect(Array.isArray(body.comments)).toBe(true);
        expect(body.comments.length).toBeGreaterThan(0);
    });

    test('search posts with unmatched keyword returns empty array', async ({ apiClient }) => {
        const response = await apiClient.get('/posts/search?q=zzzxxyyynonexisting', 200);
        const body = await response.json();
        expect(Array.isArray(body.posts)).toBe(true);
        expect(body.posts.length).toBe(0);
    });

    test('unknown comment id returns not found response', async ({ apiClient }) => {
        const response = await apiClient.get('/comments/999999', 404);
        const body = await response.json();
        expect(typeof body.message).toBe('string');
    });
});

