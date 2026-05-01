import { test, expect } from '../../helpers';

type DummyJsonPostContract = {
    id: number;
    title: string;
    body: string;
    userId: number;
    tags: string[];
};

type DummyJsonCommentContract = {
    id: number;
    body: string;
    postId: number;
    likes: number;
    user: {
        id: number;
        username: string;
    };
};

const assertPostContract: (payload: unknown) => asserts payload is DummyJsonPostContract = (
    payload: unknown,
): asserts payload is DummyJsonPostContract => {
    const record = payload as Record<string, unknown>;
    expect(typeof record.id).toBe('number');
    expect(typeof record.title).toBe('string');
    expect(typeof record.body).toBe('string');
    expect(typeof record.userId).toBe('number');
    expect(Array.isArray(record.tags)).toBe(true);
};

const assertCommentContract: (payload: unknown) => asserts payload is DummyJsonCommentContract = (
    payload: unknown,
): asserts payload is DummyJsonCommentContract => {
    const record = payload as Record<string, unknown>;
    expect(typeof record.id).toBe('number');
    expect(typeof record.body).toBe('string');
    expect(typeof record.postId).toBe('number');
    expect(typeof record.likes).toBe('number');

    const user = record.user as Record<string, unknown>;
    expect(typeof user.id).toBe('number');
    expect(typeof user.username).toBe('string');
};

test.describe('@contract DummyJSON Posts and Comments Contract', () => {
    test('GET /posts/1 matches post contract', async ({ apiClient }) => {
        const response = await apiClient.get('/posts/1', 200);
        const body = await response.json();
        assertPostContract(body);
    });

    test('GET /comments/1 matches comment contract', async ({ apiClient }) => {
        const response = await apiClient.get('/comments/1', 200);
        const body = await response.json();
        assertCommentContract(body);
    });
});

