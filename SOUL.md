# SOUL - Playwright API Testing Framework

Single source of truth untuk template API testing berbasis Playwright + TypeScript.

## Core Architecture
- **Test Layer**: `tests/api/**`.
- **Client Layer**: `tests/helpers/api-client.ts`.
- **Fixture Layer**: `tests/helpers/api-fixtures.ts` + `src/fixtures/**`.
- **Config Layer**: `src/config/api.config.ts` + env vars.

## Suite Strategy
- `smoke`: endpoint health dan baseline critical path.
- `integration`: kombinasi endpoint dan validasi behavior lintas operasi.
- `contract`: validasi shape/schema response yang wajib stabil.

## Playwright API Best Practices
1. Gunakan `request` fixture atau `APIRequestContext`, bukan library HTTP lain kecuali perlu.
2. Wajib verifikasi `status code` di setiap request.
3. Pisahkan reusable request wrapper (`ApiClient`) dari test case.
4. Gunakan `test.step()` untuk memperjelas report.
5. Gunakan data builder fixture, hindari hardcode body berulang.
6. Isolasi test: setiap test harus bisa dijalankan sendiri.
7. Jangan hardcode secret; gunakan `API_TOKEN` dan `.env`.
8. Untuk contract test, validasi field wajib dan tipe data inti.
9. Setiap test wajib memiliki `TC ID` pada judul test.
10. Format judul test: `[TC-<DOMAIN>-<3DIGIT>] <deskripsi>`.

## Context7 MCP Policy (Wajib)
Untuk pertanyaan teknis library/API:
- Prioritaskan `Context7 MCP` project-local via `npm run mcp:context7`.
- Jangan mengandalkan dokumentasi lama atau memory-only jika aturan API berpotensi berubah.
- Jika Context7 unavailable, jelaskan kendala dan pakai fallback aman.

## CI Defaults
- `forbidOnly=true` saat `CI=true`.
- `retries=2` di CI.
- `workers=1` di CI.
- Simpan artifact `playwright-report` dan `test-results`.

## Post-Automation Execution Rule (Wajib)
1. AI/agent tidak menjalankan test otomatis setelah edit.
2. AI/agent meminta user menjalankan test manual.
3. AI/agent memberi command run minimal `npm run test:api`.
4. Jalankan test oleh AI hanya jika diminta eksplisit.

## Anti-Patterns
- Test tanpa assertion status code.
- Mengandalkan urutan eksekusi test lain.
- Hardcode token/credential di source.
- Catch error lalu menelan exception.
- Menggunakan endpoint eksternal tidak stabil untuk semua test tanpa segregasi smoke.

## References
- https://playwright.dev/docs/api-testing
- https://playwright.dev/docs/test-fixtures
- https://playwright.dev/docs/best-practices
