import { test, expect } from '../../helpers';

test.describe('@integration DummyJSON Recipes Integration', () => {
    test('list recipes then validate recipe detail by id', async ({ apiClient }) => {
        const listResponse = await test.step('Act: fetch recipe list with limit 5', async () => {
            return apiClient.get('/recipes?limit=5', 200);
        });

        const listBody = await listResponse.json();

        await test.step('Assert: recipes list has at least one item', async () => {
            expect(Array.isArray(listBody.recipes)).toBe(true);
            expect(listBody.recipes.length).toBeGreaterThan(0);
        });

        const firstRecipe = listBody.recipes[0] as { id: number; name: string };

        const detailResponse = await test.step('Act: fetch recipe detail using list id', async () => {
            return apiClient.get(`/recipes/${firstRecipe.id}`, 200);
        });

        await test.step('Assert: detail id and name match source list recipe', async () => {
            const detailBody = await detailResponse.json();
            expect(detailBody.id).toBe(firstRecipe.id);
            expect(detailBody.name).toBe(firstRecipe.name);
        });
    });

    test('recipe tags endpoint returns non-empty tags', async ({ apiClient }) => {
        const response = await apiClient.get('/recipes/tags', 200);
        const body = await response.json();
        expect(Array.isArray(body)).toBe(true);
        expect(body.length).toBeGreaterThan(0);
    });

    test('recipes by tag returns items containing requested tag', async ({ apiClient }) => {
        const tag = 'Italian';
        const response = await test.step(`Act: fetch recipes by tag ${tag}`, async () => {
            return apiClient.get(`/recipes/tag/${encodeURIComponent(tag)}`, 200);
        });

        await test.step('Assert: every recipe contains selected tag', async () => {
            const body = await response.json();
            expect(Array.isArray(body.recipes)).toBe(true);
            expect(body.recipes.length).toBeGreaterThan(0);

            const invalidRecipe = body.recipes.some((recipe: { tags?: string[] }) => {
                const tags = recipe.tags ?? [];
                return !tags.includes(tag);
            });

            expect(invalidRecipe).toBe(false);
        });
    });

    test('unknown recipe id returns not found response', async ({ apiClient }) => {
        const response = await apiClient.get('/recipes/999999', 404);
        const body = await response.json();
        expect(typeof body.message).toBe('string');
    });

    test('unknown recipe tag returns empty result', async ({ apiClient }) => {
        const response = await apiClient.get('/recipes/tag/zzzxxyyynonexistingtag', 200);
        const body = await response.json();
        expect(Array.isArray(body.recipes)).toBe(true);
        expect(body.recipes.length).toBe(0);
    });

    test('recipes list with high skip returns deterministic paging payload', async ({ apiClient }) => {
        const response = await apiClient.get('/recipes?limit=10&skip=10000', 200);
        const body = await response.json();
        expect(Array.isArray(body.recipes)).toBe(true);
        expect(typeof body.total).toBe('number');
        expect(body.skip).toBe(10000);
        expect(body.recipes.length).toBe(0);
    });
});

