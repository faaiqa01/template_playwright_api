# Contributing Guidelines

## Prerequisites
1. Baca `SOUL.md` dan `AGENTS.md`.
2. Install dependency: `npm install`.
3. Install browser runtime Playwright: `npm run install:browsers`.
4. Isi `.env` dari `.env.example` (`API_BASE_URL`, optional `API_TOKEN`).

## Development Workflow
1. Buat branch fitur/fix.
2. Tambahkan atau ubah test di `tests/api`.
3. Reuse helper `tests/helpers/api-client.ts`.
4. Gunakan `test.step()` untuk flow utama.
5. Jalankan lint/test sebelum PR.

## Test Commands
- `npm run test:api`
- `npm run test:smoke`
- `npm run test:integration`
- `npm run test:contract`
- `npm run lint`

## Context7 Policy
Untuk perubahan yang bergantung pada API/library behavior terbaru:
- Jalankan Context7 MCP (`npm run mcp:context7`) saat melakukan lookup referensi teknis.

## CI Baseline
- `npm ci`
- `npm run install:browsers`
- `npm run lint`
- `npm test`

## Coding Standards
- TypeScript strict.
- Assertion spesifik (`toHaveStatus`, cek field inti payload).
- Test independent dan deterministik.
- Secret wajib dari environment variable.

## Pull Request Checklist
1. Semua test relevan pass.
2. Tidak ada TypeScript error.
3. Dokumentasi diperbarui jika ada perubahan workflow.
4. Jelaskan perubahan endpoint/contract yang diuji.
