import { test, expect } from '../../helpers';

type DummyJsonCartProductContract = {
    id: number;
    title: string;
    price: number;
    quantity: number;
};

type DummyJsonCartContract = {
    id: number;
    products: DummyJsonCartProductContract[];
    total: number;
    discountedTotal: number;
    userId: number;
    totalProducts: number;
    totalQuantity: number;
};

const assertCartContract: (payload: unknown) => asserts payload is DummyJsonCartContract = (
    payload: unknown,
): asserts payload is DummyJsonCartContract => {
    const record = payload as Record<string, unknown>;
    expect(typeof record.id).toBe('number');
    expect(Array.isArray(record.products)).toBe(true);
    expect(typeof record.total).toBe('number');
    expect(typeof record.discountedTotal).toBe('number');
    expect(typeof record.userId).toBe('number');
    expect(typeof record.totalProducts).toBe('number');
    expect(typeof record.totalQuantity).toBe('number');

    const firstProduct = (record.products as DummyJsonCartProductContract[])[0];
    expect(typeof firstProduct.id).toBe('number');
    expect(typeof firstProduct.title).toBe('string');
    expect(typeof firstProduct.price).toBe('number');
    expect(typeof firstProduct.quantity).toBe('number');
};

test.describe('@contract DummyJSON Carts Contract', () => {
    test('GET /carts/1 matches cart contract', async ({ apiClient }) => {
        const response = await apiClient.get('/carts/1', 200);
        const body = await response.json();
        assertCartContract(body);
    });
});

