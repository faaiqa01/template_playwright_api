# Playwright API Template

Template ini dioptimalkan untuk **API testing** dengan Playwright + TypeScript.

## Fokus Utama
- API smoke testing
- API integration testing
- API contract validation
- Reusable API client fixture

## Struktur
- `tests/api/smoke`: cek endpoint kritikal.
- `tests/api/integration`: validasi alur antar endpoint.
- `tests/api/contract`: validasi shape response.
- `tests/helpers/api-client.ts`: wrapper request reusable.
- `tests/helpers/api-fixtures.ts`: custom fixture `apiClient`.
- `src/config/api.config.ts`: konfigurasi runtime API.
- `src/fixtures/api.fixture.ts`: data builder payload.

## Setup
```bash
npm install
npm run install:browsers
```

Buat `.env` dari `.env.example` lalu isi minimal:
- `API_BASE_URL`
- `API_TOKEN` (jika endpoint private)

## Commands
```bash
npm test
npm run test:api
npm run test:smoke
npm run test:integration
npm run test:contract
npm run test:debug
npm run test:report
npm run lint
```

## Best Practice yang Dipakai
- `APIRequestContext` via Playwright fixture.
- Status code selalu di-assert.
- Reusable API client untuk kurangi duplikasi.
- `test.step()` untuk laporan lebih mudah dibaca.
- Data payload via fixture builder.

## Context7 Policy
Untuk referensi framework/library yang perlu up-to-date, gunakan Context7 MCP:
```bash
npm run mcp:context7
```

## Dokumentasi Aturan
- `AGENTS.md`: kontrak perilaku AI agent.
- `SOUL.md`: standar teknis inti.
- `CONTRIBUTING.md`: workflow kontribusi.
