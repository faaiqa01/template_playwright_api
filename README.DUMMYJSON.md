# README DummyJSON API Testing

Dokumen ini khusus untuk project test API DummyJSON menggunakan Playwright.
README utama project tidak diubah oleh dokumen ini.

## Target API
- Docs: https://dummyjson.com/docs
- Auth docs: https://dummyjson.com/docs/auth

## Status Implementasi
Semua batch pada `plan/DUMMYJSON-BATCH-PLAN.md` sudah selesai implementasi dan sudah tervalidasi manual.

## Cakupan Test
### Domain yang sudah di-cover
- Auth
- Users
- Products
- Carts
- Posts and Comments
- Todos and Quotes
- Recipes
- Reliability and CI hardening

### Layer test yang tersedia
- Smoke tests (`tests/api/smoke`)
- Integration tests (`tests/api/integration`)
- Contract tests (`tests/api/contract`)

## Daftar Test yang Sudah Dibuat
### Smoke
- `tests/api/smoke/health.spec.ts` - baseline product endpoint
- `tests/api/smoke/users.smoke.spec.ts` - users list baseline
- `tests/api/smoke/products.smoke.spec.ts` - products list baseline
- `tests/api/smoke/carts.smoke.spec.ts` - carts list baseline
- `tests/api/smoke/posts-comments.smoke.spec.ts` - posts list baseline
- `tests/api/smoke/todos-quotes.smoke.spec.ts` - todos list baseline
- `tests/api/smoke/recipes.smoke.spec.ts` - recipes list baseline

### Integration
- `tests/api/integration/posts.spec.ts` - login + auth me (baseline awal)
- `tests/api/integration/auth.spec.ts` - login valid/invalid, auth me unauthorized, refresh token
- `tests/api/integration/users.spec.ts` - users list/detail/search + negative unknown id
- `tests/api/integration/products.spec.ts` - products list/detail/search/categories + negative unknown id
- `tests/api/integration/carts.spec.ts` - carts list/detail/by user, add cart, invalid payload
- `tests/api/integration/posts-comments.spec.ts` - post-detail-comments relation, search posts, list comments
- `tests/api/integration/todos-quotes.spec.ts` - todos list/detail/random, quotes list, negative invalid todo id
- `tests/api/integration/recipes.spec.ts` - recipes list/detail/tags/by tag + negative unknown id
- `tests/api/integration/reliability.spec.ts` - repeated-call stability + retry-safe assertion example

### Contract
- `tests/api/contract/posts.contract.spec.ts` - baseline product contract (legacy naming)
- `tests/api/contract/auth.contract.spec.ts` - login response contract
- `tests/api/contract/users.contract.spec.ts` - user detail contract
- `tests/api/contract/products.contract.spec.ts` - product detail contract
- `tests/api/contract/carts.contract.spec.ts` - cart detail contract
- `tests/api/contract/posts-comments.contract.spec.ts` - post + comment contracts
- `tests/api/contract/todos-quotes.contract.spec.ts` - todo + quote contracts
- `tests/api/contract/recipes.contract.spec.ts` - recipe contract (nutrition-related fields included)

## Struktur Penting
- `tests/helpers/api-client.ts` - reusable API request wrapper
- `tests/helpers/api-fixtures.ts` - custom Playwright fixtures
- `tests/helpers/file-log-reporter.ts` - reporter log ke file
- `playwright.config.ts` - konfigurasi utama Playwright API
- `plan/DUMMYJSON-BATCH-PLAN.md` - roadmap dan tracker batch

## Environment Variables
Copy `.env.example` ke `.env`, minimal isi:
- `API_BASE_URL=https://dummyjson.com`
- `DUMMYJSON_USERNAME=emilys`
- `DUMMYJSON_PASSWORD=emilyspass`
- `DUMMYJSON_EXPIRES_IN_MINS=30`

## Menjalankan Test
### Run by scope
```bash
npm run test:smoke
npm run test:integration
npm run test:contract
npm run test:api
```

### Run by tag
```bash
npm run test:tag:smoke
npm run test:tag:integration
npm run test:tag:contract
```

## Reporting dan Log
- HTML report: `playwright-report/`
- JSON report: `test-results/results.json`
- JUnit report: `test-results/results.xml`
- Runtime log file (custom reporter): `logs/test-run.log`

## Catatan
- Suite menggunakan assertion yang retry-safe pada area reliability.
- Validasi contract saat ini berbasis type checks manual; schema validator (mis. zod) bisa ditambahkan jika diperlukan.
