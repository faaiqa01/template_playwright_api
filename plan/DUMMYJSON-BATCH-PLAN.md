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

## Suggested Execution Order
1. Batch 1
2. Batch 2
3. Batch 3
4. Batch 4
5. Batch 5
6. Batch 6
7. Batch 8
8. Batch 7 (optional)

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
