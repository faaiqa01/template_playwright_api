# Contributing Guidelines

## Prerequisites
1. Baca `SOUL.md` dan `AGENTS.md`.
2. Install dependency: `npm install`.
3. Install browser runtime Playwright: `npm run install:browsers`.
4. Isi `.env` dari `.env.example` (`API_BASE_URL`, optional `API_TOKEN`).
5. Opsional debug logging: set `API_DEBUG=true` dan `API_LOG_LEVEL=debug`.

## Auth Token Conventions
- Simpan token auth di `.env` sebagai `API_TOKEN` (jangan di source code).
- Semua suite (`smoke`, `integration`, `contract`) yang butuh auth wajib pakai token dari config/fixture terpusat.
- Jangan buat token berbeda per test kecuali skenario test memang memvalidasi multi-role auth.
- Untuk perubahan token, cukup update env/secrets manager.
- Cek dan pakai token existing terlebih dulu; jangan login ulang jika token masih valid.
- Jalankan login hanya sebagai fallback saat token invalid/expired atau respons auth `401/403`.

## Development Workflow
0. Untuk inisialisasi automation pertama: hapus dulu file template bawaan yang tidak dipakai.
1. Buat branch fitur/fix.
2. Tambahkan atau ubah test di `tests/api`.
3. Reuse helper `tests/helpers/api-client.ts`.
4. Gunakan `test.step()` untuk flow utama.
5. Jalankan lint/test sebelum PR.

## Template Cleanup Policy
- Cleanup file template bawaan wajib dilakukan sebelum pembuatan automation pertama.
- Jangan hapus file yang statusnya belum jelas; konfirmasi dulu ke user.
- Prioritas file template untuk dievaluasi/hapus:
- `tests/api/smoke/health.spec.ts`
- `tests/api/integration/posts.spec.ts`
- `tests/api/contract/posts.contract.spec.ts`
- `tests/unit/utils.spec.ts` (jika tidak dipakai pada project API-only)
- `src/utils/string.util.ts`
- `src/utils/date.util.ts`
- `src/utils/common.util.ts`
- File fondasi yang umumnya dipertahankan:
- `tests/helpers/api-client.ts`
- `tests/helpers/api-fixtures.ts`
- `src/config/api.config.ts`
- `src/fixtures/api.fixture.ts`

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
- Log harus aman: redact token/cookie/credential dari output.
- Logging verbose hanya lewat env flag (`API_DEBUG` / `API_LOG_LEVEL`), bukan default.
- Wajib gunakan `TC ID` di judul setiap test.
- Format TC ID: `[TC-<DOMAIN>-<3DIGIT>]`.

## Logging Conventions
- Single source logging: gunakan satu file logger `tests/helpers/logger.ts`.
- Default level disarankan `info` atau lebih rendah untuk local run normal.
- Gunakan `debug` hanya untuk investigasi issue spesifik.
- Prefer logging terstruktur: `method`, `url/path`, `status`, `durationMs`, `traceId` (jika ada).
- Hindari logging full response body kecuali diperlukan untuk failure analysis.
- Saat ada failure penting, lampirkan log relevan ke `test-results` agar mudah ditelusuri di CI.
- Jangan buat logger baru di test/spec; import dari logger terpusat yang sama.

## Pull Request Checklist
1. Semua test relevan pass.
2. Tidak ada TypeScript error.
3. Dokumentasi diperbarui jika ada perubahan workflow.
4. Jelaskan perubahan endpoint/contract yang diuji.
