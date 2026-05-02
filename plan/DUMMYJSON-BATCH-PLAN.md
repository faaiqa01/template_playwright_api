# DummyJSON API Test Batch Plan

Dokumen ini membagi implementasi test DummyJSON menjadi batch kecil agar progres lebih terkontrol.

## Progress Validation Tracker
Gunakan tabel ini untuk menandai status validasi per batch setelah implementasi.

| Batch | Implementasi | Validasi Manual | Last Update | Catatan |
|---|---|---|---|---|
| Batch 0 - Foundation | Sudah | Sudah | 2026-05-02 | Baseline awal DummyJSON |
| Batch 1 - Auth Deepening | Sudah | Sudah | 2026-05-02 | Login, unauthorized auth me, refresh token |
| Batch 2 - Users Domain | Sudah | Sudah | 2026-05-02 | List, single user, search, negative unknown id |
| Batch 3 - Products Domain | Sudah | Sudah | 2026-05-02 | List, detail by id, search, categories, negative unknown id |
| Batch 4 - Carts Domain | Sudah | Sudah | 2026-05-02 | List, detail, carts by user, add cart, invalid payload |
| Batch 5 - Posts and Comments | Sudah | Sudah | 2026-05-02 | List/detail posts, comments relation, search, negative unknown id |
| Batch 6 - Todos and Quotes | Sudah | Sudah | 2026-05-02 | List/detail todos, random todo, quotes list, negative invalid id |
| Batch 7 - Recipes (Optional) | Sudah | Sudah | 2026-05-02 | List/detail recipes, tags, recipes by tag, negative invalid id |
| Batch 8 - Reliability and CI Hardening | Sudah | Sudah | 2026-05-02 | Tag-based run, junit report, reliability assertions |
| Batch 9 - Scenario Expansion | Sudah | Sudah | 2026-05-02 | Validasi final 60/60 pass setelah penyesuaian behavior aktual DummyJSON |
| Batch 10 - Full Docs Coverage (CRUD+) | Sudah | Sudah | 2026-05-02 | Validasi final 85/85 pass setelah penyesuaian assertion pada behavior aktual |

Keterangan status:
- `Implementasi`: `Belum` | `In Progress` | `Sudah`
- `Validasi Manual`: `Belum` | `Sudah`

## Aturan Eksekusi Umum
- Setiap batch wajib punya minimal:
  - 1 smoke test
  - 1 integration flow
  - 1 contract validation
- Setiap batch wajib punya minimal 1 negative test.
- Reuse helper yang ada di `tests/helpers/api-client.ts`.
- Simpan test berdasarkan domain endpoint agar mudah maintain.

## Batch 0 - Foundation (Selesai)
Status: `done`

Scope:
- Setup config API ke DummyJSON.
- Basic smoke endpoint.
- Basic login + auth me flow.
- Basic contract check.

Files:
- `tests/api/smoke/health.spec.ts`
- `tests/api/integration/posts.spec.ts`
- `tests/api/contract/posts.contract.spec.ts`

## Batch 1 - Auth Deepening
Status: `done`

Target:
- Login valid + invalid lebih lengkap.
- Refresh token flow (`POST /auth/refresh`).
- Negative auth me tanpa token (`GET /auth/me` -> unauthorized).

Folder rekomendasi:
- `tests/api/integration/auth.spec.ts`
- `tests/api/contract/auth.contract.spec.ts`

Hasil implementasi:
- `tests/api/integration/auth.spec.ts`
- `tests/api/contract/auth.contract.spec.ts`
- update helper `tests/helpers/api-client.ts` (`getWithHeaders`)

## Batch 2 - Users Domain
Status: `done`

Target endpoint:
- `GET /users`
- `GET /users/{id}`
- `GET /users/search`

Checklist:
- Pagination/limit response check.
- Search result consistency.
- Negative: unknown user id.

Folder rekomendasi:
- `tests/api/smoke/users.smoke.spec.ts`
- `tests/api/integration/users.spec.ts`
- `tests/api/contract/users.contract.spec.ts`

Hasil implementasi:
- `tests/api/smoke/users.smoke.spec.ts`
- `tests/api/integration/users.spec.ts`
- `tests/api/contract/users.contract.spec.ts`

## Batch 3 - Products Domain
Status: `done`

Target endpoint:
- `GET /products`
- `GET /products/{id}`
- `GET /products/search`
- `GET /products/categories`

Checklist:
- Product list schema baseline.
- Search behavior by keyword.
- Negative: product id tidak ada.

Folder rekomendasi:
- `tests/api/integration/products.spec.ts`
- `tests/api/contract/products.contract.spec.ts`

Hasil implementasi:
- `tests/api/smoke/products.smoke.spec.ts`
- `tests/api/integration/products.spec.ts`
- `tests/api/contract/products.contract.spec.ts`

## Batch 4 - Carts Domain
Status: `done`

Target endpoint:
- `GET /carts`
- `GET /carts/{id}`
- `GET /carts/user/{id}`
- `POST /carts`

Checklist:
- Create cart payload validation.
- Hitung total/discounted total basic assertion.
- Negative: payload invalid.

Folder rekomendasi:
- `tests/api/integration/carts.spec.ts`
- `tests/api/contract/carts.contract.spec.ts`

Hasil implementasi:
- `tests/api/smoke/carts.smoke.spec.ts`
- `tests/api/integration/carts.spec.ts`
- `tests/api/contract/carts.contract.spec.ts`

## Batch 5 - Posts and Comments
Status: `done`

Target endpoint:
- `GET /posts`
- `GET /posts/{id}`
- `GET /posts/{id}/comments`
- `GET /comments`

Checklist:
- Relasi post-comment consistency.
- Search posts.
- Negative: unknown post id.

Folder rekomendasi:
- `tests/api/integration/posts-comments.spec.ts`
- `tests/api/contract/posts-comments.contract.spec.ts`

Hasil implementasi:
- `tests/api/smoke/posts-comments.smoke.spec.ts`
- `tests/api/integration/posts-comments.spec.ts`
- `tests/api/contract/posts-comments.contract.spec.ts`

## Batch 6 - Todos and Quotes
Status: `done`

Target endpoint:
- `GET /todos`
- `GET /todos/{id}`
- `GET /todos/random`
- `GET /quotes`

Checklist:
- Random endpoint sanity check.
- Todo completion field validation.
- Negative: invalid id.

Hasil implementasi:
- `tests/api/smoke/todos-quotes.smoke.spec.ts`
- `tests/api/integration/todos-quotes.spec.ts`
- `tests/api/contract/todos-quotes.contract.spec.ts`

## Batch 7 - Recipes (Optional Expansion)
Status: `done`

Target endpoint:
- `GET /recipes`
- `GET /recipes/{id}`
- `GET /recipes/tags`
- `GET /recipes/tag/{tag}`

Checklist:
- Tag-based filtering validation.
- Contract validation untuk field nutrition dasar.

Hasil implementasi:
- `tests/api/smoke/recipes.smoke.spec.ts`
- `tests/api/integration/recipes.spec.ts`
- `tests/api/contract/recipes.contract.spec.ts`

## Batch 8 - Reliability and CI Hardening
Status: `done`

Target:
- Tambah retry-safe assertions.
- Tambah test tagging (`@smoke`, `@contract`, dsb).
- Stabilkan CI matrix dan reporting.
- Tambah schema validator (mis. zod) untuk contract test.

Hasil implementasi:
- Tagging suite titles: `@smoke`, `@integration`, `@contract` pada folder terkait.
- Script run by tag di `package.json`:
  - `test:tag:smoke`
  - `test:tag:integration`
  - `test:tag:contract`
- Reporter `junit` ditambahkan di `playwright.config.ts` (`test-results/results.xml`).
- Spec reliability baru: `tests/api/integration/reliability.spec.ts`.

## Batch 9 - Scenario Expansion
Status: `done`

Target:
- Menambah skenario lanjutan untuk semua domain yang sudah ada tanpa mengubah struktur layer test.
- Fokus pada edge case, negative case tambahan, dan flow fungsional yang lebih realistis.

Scope per domain:
- Auth:
  - Refresh token invalid/expired.
  - Login payload tidak lengkap.
  - Auth me dengan token malformed.
- Users:
  - Pagination boundary (`limit=0`, `skip` besar).
  - Search tanpa hasil.
  - Invalid query parameter handling.
- Products:
  - Search tanpa hasil.
  - Invalid product/category path.
  - Boundary paging (`limit`, `skip`).
- Carts:
  - Payload quantity edge case (`0`/negatif).
  - Invalid product id saat add cart.
  - Validasi konsistensi summary totals.
- Posts and Comments:
  - Search tanpa hasil.
  - Invalid comments path.
  - Relasi post-comment tambahan (subset sampling).
- Todos and Quotes:
  - Invalid todo/quote id tambahan.
  - Random endpoint repeatability sanity.
  - Response shape consistency lintas beberapa sample.
- Recipes:
  - Unknown tag behavior.
  - Search/filter result kosong.
  - Tag matching tambahan dengan variasi tag.

Output yang diharapkan:
- Penambahan test di file domain existing (tanpa duplikasi tidak perlu).
- Semua test baru mengikuti `test.step()`, assertion spesifik, dan deterministic checks.
- Tracker batch diupdate setelah implementasi + validasi manual.

Hasil implementasi:
- `tests/api/integration/auth.spec.ts`
- `tests/api/integration/users.spec.ts`
- `tests/api/integration/products.spec.ts`
- `tests/api/integration/carts.spec.ts`
- `tests/api/integration/posts-comments.spec.ts`
- `tests/api/integration/todos-quotes.spec.ts`
- `tests/api/integration/recipes.spec.ts`

Hasil validasi manual final (`npm run test:api`, 2026-05-02):
- `60 passed`, `0 failed` (total 60 test).
- Penyesuaian yang dilakukan agar selaras dengan behavior aktual DummyJSON:
  - Refresh token malformed: expect `403` (bukan `401`).
  - Add cart quantity `0`: API menormalkan quantity menjadi `1` dengan status `201`.

## Docs Coverage Matrix (Source of Truth)
Referensi utama: `https://dummyjson.com/docs` (menu endpoint lengkap).

Status saat ini:
- Sudah covered kuat: Auth, Users (read/search), Products (read/search/categories), Carts (read/add), Posts/Comments (read/search), Todos/Quotes (read/random), Recipes (read/tags).
- Belum covered penuh: mayoritas `POST/PUT/PATCH/DELETE` pada beberapa resource + beberapa varian `sort/filter/select/tag/user`.

### Endpoint Families dari Docs yang harus ditutup
1. Core/Meta
- `/test` (all methods), delay param, auth-as-user pattern, `/ip`, query `select`.
2. Auth
- `/auth/login`, `/auth/me`, `/auth/refresh` (sudah basic, perlu variasi method/payload lebih luas).
3. Products
- Read: all/single/search/limit-skip/sort/categories/category-list/by-category (sebagian sudah).
- Write: add/update/patch/delete (belum full).
4. Carts
- Read: all/single/by-user (sudah).
- Write: add/update/patch/delete (update/delete belum).
5. Recipes
- Read: all/single/search/limit-skip/sort/tags/by-tag/by-meal (by-meal belum).
- Write: add/update/patch/delete (belum).
6. Users
- Read: all/single/search/filter/limit-skip/sort + user-carts/posts/todos (nested user endpoints belum penuh).
- Write: add/update/patch/delete (belum).
7. Posts
- Read: all/single/search/limit-skip/sort/by-user/comments (by-user/sort/limit-skip belum penuh).
- Write: add/update/patch/delete (belum).
8. Comments
- Read: all/single/limit-skip/by-post (by-post via `/comments/post/{id}` belum).
- Write: add/update/patch/delete (belum).
9. Todos
- Read: all/single/random/limit-skip (sudah sebagian).
- Write: add/update/patch/delete (belum).
10. Quotes
- Read: all/single/random/limit-skip (sudah sebagian, belum limit-skip depth).
11. Dynamic Image + Mock HTTP
- Dynamic image variants (size/text/color/format/font/identicon).
- Mock HTTP response/custom response endpoints.
12. Custom Response Generator
- Validasi custom response behavior lintas method (`GET/POST/PUT/PATCH/DELETE`) dan query modifiers (`limit/skip/select/sortBy/order`) sesuai fitur repo.
13. Global Query Features (lintas resource)
- `limit`, `skip`, `select` (single/multiple), `sortBy`, `order`, `delay`.
- Variasi ini harus diuji minimal di `products`, `users`, `posts`, `comments`, `todos`, `recipes`, `quotes`.

## Batch 10 - Full Docs Coverage (CRUD+)
Status: `done`

Target:
- Menutup semua gap endpoint dari Docs Coverage Matrix dengan prioritas CRUD dan query variants.
- Menjaga best practice existing: layer terpisah, assertion spesifik, deterministic checks, dan `test.step()`.

Sub-batch eksekusi:
1. `10A - CRUD Core` (`done - implementasi`):
- Products, Carts, Users, Posts, Comments, Todos, Recipes untuk `add/update/patch/delete`.
2. `10B - Query/Filter/Sort Expansion` (`done - implementasi`):
- `limit/skip/select/sort/filter` untuk domain utama.
3. `10C - Nested & Cross-resource` (`done - implementasi`):
- Users nested endpoints (`/users/{id}/carts|posts|todos`), posts-by-user, comments-by-post.
4. `10D - Platform Utilities` (`done - implementasi`):
- `/test`, `/ip`, delay behavior, Dynamic Image, Mock HTTP.
5. `10E - Custom Response & Query Modifiers` (`done - implementasi`):
- Custom response endpoint scenarios.
- `sortBy/order/select/limit/skip` compatibility checks lintas resource.

Prioritas khusus dari cross-check GitHub repo:
- Pastikan coverage untuk fitur yang disebut di repo README:
  - Custom Responses
  - Filters and Nested Resources
  - HTTP Methods Support (GET/POST/PUT/PATCH/DELETE)
  - Delay Responses
  - Dynamic Image Generation + Identicon

Definition of Done Batch 10:
- Semua endpoint family di atas punya minimal satu test valid (positive).
- Untuk endpoint write, wajib ada minimal satu negative case.
- Untuk endpoint query modifiers, minimal 1 kombinasi multi-parameter tervalidasi per resource utama.
- Hasil run `npm run test:api` pass penuh setelah integrasi akhir.

Status implementasi saat ini:
- `10A` selesai implementasi pada file:
  - `tests/api/integration/crud-core-batch1.spec.ts`
  - `tests/helpers/api-client.ts` (tambahan helper `putJson`, `patchJson`, `delete`)
- `10B` selesai implementasi pada file:
  - `tests/api/integration/query-filter-sort-batch10b.spec.ts`
- `10C` selesai implementasi pada file:
  - `tests/api/integration/nested-cross-resource-batch10c.spec.ts`
- `10D` selesai implementasi pada file:
  - `tests/api/integration/platform-utilities-batch10d.spec.ts`
- `10E` selesai implementasi pada file:
  - `tests/api/integration/custom-response-modifiers-batch10e.spec.ts`
- Validasi manual sudah dijalankan untuk seluruh sub-batch 10A-10E.

Hasil validasi manual final (`npm run test:api`, 2026-05-02):
- `85 passed`, `0 failed` (total 85 test).
- Penyesuaian assertion telah dilakukan agar selaras dengan behavior aktual DummyJSON untuk endpoint CRUD dan query modifiers.

## Suggested Execution Order
1. Batch 1
2. Batch 2
3. Batch 3
4. Batch 4
5. Batch 5
6. Batch 6
7. Batch 8
8. Batch 7 (optional)
9. Batch 9
10. Batch 10

## Template Update per Batch
Salin template ini saat update progres:

```text
Batch: <nama batch>
Implementasi: Belum/In Progress/Sudah
Validasi Manual: Belum/Sudah
Tanggal Update: YYYY-MM-DD
Catatan:
- ...
```
