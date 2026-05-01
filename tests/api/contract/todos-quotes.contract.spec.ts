import { test, expect } from '../../helpers';

type DummyJsonTodoContract = {
    id: number;
    todo: string;
    completed: boolean;
    userId: number;
};

type DummyJsonQuoteContract = {
    id: number;
    quote: string;
    author: string;
};

const assertTodoContract: (payload: unknown) => asserts payload is DummyJsonTodoContract = (
    payload: unknown,
): asserts payload is DummyJsonTodoContract => {
    const record = payload as Record<string, unknown>;
    expect(typeof record.id).toBe('number');
    expect(typeof record.todo).toBe('string');
    expect(typeof record.completed).toBe('boolean');
    expect(typeof record.userId).toBe('number');
};

const assertQuoteContract: (payload: unknown) => asserts payload is DummyJsonQuoteContract = (
    payload: unknown,
): asserts payload is DummyJsonQuoteContract => {
    const record = payload as Record<string, unknown>;
    expect(typeof record.id).toBe('number');
    expect(typeof record.quote).toBe('string');
    expect(typeof record.author).toBe('string');
};

test.describe('@contract DummyJSON Todos and Quotes Contract', () => {
    test('GET /todos/1 matches todo contract', async ({ apiClient }) => {
        const response = await apiClient.get('/todos/1', 200);
        const body = await response.json();
        assertTodoContract(body);
    });

    test('GET /quotes/1 matches quote contract', async ({ apiClient }) => {
        const response = await apiClient.get('/quotes/1', 200);
        const body = await response.json();
        assertQuoteContract(body);
    });
});

