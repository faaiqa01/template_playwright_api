import { test, expect } from '../../helpers';

test.describe('@integration DummyJSON CRUD Core Batch 1', () => {
    test('products CRUD flow baseline', async ({ apiClient }) => {
        const createResponse = await test.step('Act: create product', async () => {
            return apiClient.postJson(
                '/products/add',
                {
                    title: 'Batch10 Product',
                    price: 99,
                },
                201,
            );
        });

        await test.step('Assert: created product payload', async () => {
            const body = await createResponse.json();
            expect(typeof body.id).toBe('number');
            expect(body.title).toBe('Batch10 Product');
            expect(body.price).toBe(99);
        });

        const updateResponse = await test.step('Act: update product with PUT', async () => {
            return apiClient.putJson('/products/1', { title: 'Updated Product Title' }, 200);
        });

        await test.step('Assert: PUT response reflects update', async () => {
            const body = await updateResponse.json();
            expect(body.id).toBe(1);
            expect(body.title).toBe('Updated Product Title');
        });

        const patchResponse = await test.step('Act: patch product price', async () => {
            return apiClient.patchJson('/products/1', { price: 111 }, 200);
        });

        await test.step('Assert: PATCH response reflects field patch', async () => {
            const body = await patchResponse.json();
            expect(body.id).toBe(1);
            expect(body.price).toBe(111);
        });

        const deleteResponse = await test.step('Act: delete product', async () => {
            return apiClient.delete('/products/1', 200);
        });

        await test.step('Assert: DELETE product response has deletion marker', async () => {
            const body = await deleteResponse.json();
            expect(body.id).toBe(1);
            expect(body.isDeleted).toBe(true);
            expect(typeof body.deletedOn).toBe('string');
        });
    });

    test('posts CRUD flow baseline', async ({ apiClient }) => {
        const createResponse = await apiClient.postJson(
            '/posts/add',
            {
                title: 'Batch10 Post',
                body: 'CRUD post body',
                userId: 1,
            },
            201,
        );
        const createBody = await createResponse.json();
        expect(typeof createBody.id).toBe('number');

        const updateResponse = await apiClient.putJson('/posts/1', { title: 'Updated Post Title' }, 200);
        const updateBody = await updateResponse.json();
        expect(updateBody.title).toBe('Updated Post Title');

        const patchResponse = await apiClient.patchJson('/posts/1', { reactions: 999 }, 200);
        const patchBody = await patchResponse.json();
        expect(patchBody.reactions).toBe(999);

        const deleteResponse = await apiClient.delete('/posts/1', 200);
        const deleteBody = await deleteResponse.json();
        expect(deleteBody.isDeleted).toBe(true);
    });

    test('todos CRUD flow baseline', async ({ apiClient }) => {
        const createResponse = await apiClient.postJson(
            '/todos/add',
            {
                todo: 'Batch10 Todo',
                completed: false,
                userId: 1,
            },
            201,
        );
        const createBody = await createResponse.json();
        expect(typeof createBody.id).toBe('number');

        const updateResponse = await apiClient.putJson('/todos/1', { todo: 'Updated Todo', completed: true }, 200);
        const updateBody = await updateResponse.json();
        expect(updateBody.todo).toBe('Updated Todo');

        const patchResponse = await apiClient.patchJson('/todos/1', { completed: true }, 200);
        const patchBody = await patchResponse.json();
        expect(patchBody.completed).toBe(true);

        const deleteResponse = await apiClient.delete('/todos/1', 200);
        const deleteBody = await deleteResponse.json();
        expect(deleteBody.isDeleted).toBe(true);
    });

    test('users CRUD flow baseline', async ({ apiClient }) => {
        const createResponse = await apiClient.postJson(
            '/users/add',
            {
                firstName: 'Batch',
                lastName: 'Ten',
                age: 30,
            },
            201,
        );
        const createBody = await createResponse.json();
        expect(typeof createBody.id).toBe('number');

        const updateResponse = await apiClient.putJson('/users/1', { firstName: 'UpdatedName' }, 200);
        const updateBody = await updateResponse.json();
        expect(updateBody.firstName).toBe('UpdatedName');

        const patchResponse = await apiClient.patchJson('/users/1', { age: 31 }, 200);
        const patchBody = await patchResponse.json();
        expect(patchBody.age).toBe(31);

        const deleteResponse = await apiClient.delete('/users/1', 200);
        const deleteBody = await deleteResponse.json();
        expect(deleteBody.isDeleted).toBe(true);
    });

    test('comments CRUD flow baseline', async ({ apiClient }) => {
        const createResponse = await apiClient.postJson(
            '/comments/add',
            {
                body: 'Batch10 comment body',
                postId: 1,
                userId: 1,
            },
            201,
        );
        const createBody = await createResponse.json();
        expect(typeof createBody.id).toBe('number');

        const updateResponse = await apiClient.putJson('/comments/1', { body: 'Updated comment body' }, 200);
        const updateBody = await updateResponse.json();
        expect(updateBody.body).toBe('Updated comment body');

        const patchResponse = await apiClient.patchJson('/comments/1', { likes: 50 }, 200);
        const patchBody = await patchResponse.json();
        expect(patchBody.id).toBe(1);
        expect(typeof patchBody.likes).toBe('number');

        const deleteResponse = await apiClient.delete('/comments/1', 200);
        const deleteBody = await deleteResponse.json();
        expect(deleteBody.isDeleted).toBe(true);
    });

    test('recipes CRUD flow baseline', async ({ apiClient }) => {
        const createResponse = await apiClient.postJson(
            '/recipes/add',
            {
                name: 'Batch10 Recipe',
                ingredients: ['Ingredient A'],
                instructions: ['Step 1'],
                prepTimeMinutes: 10,
                cookTimeMinutes: 20,
                servings: 2,
                difficulty: 'Easy',
                cuisine: 'Fusion',
                caloriesPerServing: 120,
                tags: ['Batch10'],
                image: 'https://cdn.dummyjson.com/recipe-images/1.webp',
                rating: 4.5,
                reviewCount: 1,
                mealType: ['dinner'],
            },
            200,
        );
        const createBody = await createResponse.json();
        expect(typeof createBody.id).toBe('number');

        const updateResponse = await apiClient.putJson('/recipes/1', { name: 'Updated Recipe Name' }, 200);
        const updateBody = await updateResponse.json();
        expect(updateBody.name).toBe('Updated Recipe Name');

        const patchResponse = await apiClient.patchJson('/recipes/1', { servings: 3 }, 200);
        const patchBody = await patchResponse.json();
        expect(patchBody.servings).toBe(3);

        const deleteResponse = await apiClient.delete('/recipes/1', 200);
        const deleteBody = await deleteResponse.json();
        expect(deleteBody.isDeleted).toBe(true);
    });

    test('carts update patch delete baseline', async ({ apiClient }) => {
        const updateResponse = await apiClient.putJson(
            '/carts/1',
            {
                merge: true,
                products: [{ id: 1, quantity: 2 }],
            },
            200,
        );
        const updateBody = await updateResponse.json();
        expect(updateBody.id).toBe(1);

        const patchResponse = await apiClient.patchJson(
            '/carts/1',
            {
                products: [{ id: 1, quantity: 3 }],
            },
            200,
        );
        const patchBody = await patchResponse.json();
        expect(patchBody.id).toBe(1);

        const deleteResponse = await apiClient.delete('/carts/1', 200);
        const deleteBody = await deleteResponse.json();
        expect(deleteBody.isDeleted).toBe(true);
    });

    test('negative CRUD core: update unknown product returns not found', async ({ apiClient }) => {
        const response = await apiClient.putJson('/products/999999', { title: 'No item' }, 404);
        const body = await response.json();
        expect(typeof body.message).toBe('string');
    });
});
