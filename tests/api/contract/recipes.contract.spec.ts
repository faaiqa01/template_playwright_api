import { test, expect } from '../../helpers';

type DummyJsonRecipeContract = {
    id: number;
    name: string;
    ingredients: string[];
    instructions: string[];
    prepTimeMinutes: number;
    cookTimeMinutes: number;
    servings: number;
    difficulty: string;
    cuisine: string;
    caloriesPerServing: number;
    tags: string[];
};

const assertRecipeContract: (payload: unknown) => asserts payload is DummyJsonRecipeContract = (
    payload: unknown,
): asserts payload is DummyJsonRecipeContract => {
    const record = payload as Record<string, unknown>;
    expect(typeof record.id).toBe('number');
    expect(typeof record.name).toBe('string');
    expect(Array.isArray(record.ingredients)).toBe(true);
    expect(Array.isArray(record.instructions)).toBe(true);
    expect(typeof record.prepTimeMinutes).toBe('number');
    expect(typeof record.cookTimeMinutes).toBe('number');
    expect(typeof record.servings).toBe('number');
    expect(typeof record.difficulty).toBe('string');
    expect(typeof record.cuisine).toBe('string');
    expect(typeof record.caloriesPerServing).toBe('number');
    expect(Array.isArray(record.tags)).toBe(true);
};

test.describe('@contract DummyJSON Recipes Contract', () => {
    test('GET /recipes/1 matches recipe contract', async ({ apiClient }) => {
        const response = await apiClient.get('/recipes/1', 200);
        const body = await response.json();
        assertRecipeContract(body);
    });
});

