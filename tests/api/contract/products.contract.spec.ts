import { test, expect } from '../../helpers';

type DummyJsonProductContract = {
    id: number;
    title: string;
    description: string;
    price: number;
    category: string;
    stock: number;
};

const assertProductContract: (payload: unknown) => asserts payload is DummyJsonProductContract = (
    payload: unknown,
): asserts payload is DummyJsonProductContract => {
    const record = payload as Record<string, unknown>;
    expect(typeof record.id).toBe('number');
    expect(typeof record.title).toBe('string');
    expect(typeof record.description).toBe('string');
    expect(typeof record.price).toBe('number');
    expect(typeof record.category).toBe('string');
    expect(typeof record.stock).toBe('number');
};

test.describe('@contract DummyJSON Products Contract', () => {
    test('GET /products/1 matches product contract', async ({ apiClient }) => {
        const response = await apiClient.get('/products/1', 200);
        const body = await response.json();
        assertProductContract(body);
    });
});

