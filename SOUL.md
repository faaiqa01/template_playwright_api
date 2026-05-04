# SOUL - Playwright API Testing Framework

Single source of truth untuk template API testing berbasis Playwright + TypeScript.

## Core Architecture
- **Test Layer**: `tests/api/**`.
- **Client Layer**: `tests/helpers/api-client.ts`.
- **Fixture Layer**: `tests/helpers/api-fixtures.ts` + `src/fixtures/**`.
- **Config Layer**: `src/config/api.config.ts` + env vars.

## Template Bootstrap Rule (Wajib)
- Sebelum automation pertama dibuat, AI/agent wajib melakukan cleanup file template bawaan yang tidak diperlukan.
- Urutan wajib: cleanup template dulu, baru implement automation.
- Jika status file ambigu (masih mungkin dipakai), AI/agent harus konfirmasi ke user sebelum penghapusan.

### Template File Inventory (Awal Project)
- `tests/api/smoke/health.spec.ts` (contoh smoke)
- `tests/api/integration/posts.spec.ts` (contoh integration)
- `tests/api/contract/posts.contract.spec.ts` (contoh contract)
- `tests/unit/utils.spec.ts` (contoh unit; optional untuk template API-only)
- `src/utils/string.util.ts`, `src/utils/date.util.ts`, `src/utils/common.util.ts` (utility generik template)

Baseline retain:
- `tests/helpers/api-client.ts`
- `tests/helpers/api-fixtures.ts`
- `src/config/api.config.ts`
- `src/fixtures/api.fixture.ts`

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

## Auth Token Policy (Wajib)
- Token autentikasi utama disimpan di source terpusat (`API_TOKEN` env, di-injeksi lewat config/fixture).
- Semua test API yang butuh auth wajib memakai token dari source terpusat yang sama.
- Dilarang hardcode token di file spec, helper, atau data fixture.
- Jika token berubah/rotasi, update hanya di env/config tanpa modifikasi test satu per satu.
- Prioritas auth flow: validasi token existing terlebih dulu; jika valid maka skip login.
- Login endpoint hanya dipanggil jika token tidak valid, expired, atau menerima `401/403`.

## Logging Policy (Wajib)
- Logging hanya dikonfigurasi lewat satu file logger terpusat: `tests/helpers/logger.ts`.
- Default logging harus low-noise untuk run normal.
- Debug logging hanya aktif saat `API_DEBUG=true`.
- Level log dikontrol lewat `API_LOG_LEVEL` dengan nilai: `error`, `warn`, `info`, `debug`.
- Log request/response harus terfokus (endpoint, method, status, durasi), hindari dump payload berlebihan.
- Data sensitif wajib di-redact: `Authorization`, `API_TOKEN`, cookie/session, password/credential.
- Dilarang membuat logger paralel di file spec/helper lain; semua modul harus reuse logger terpusat.
- Jika test gagal di CI, simpan log pendukung ke artifact `test-results` bersama report.

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
- Menyalakan verbose log global untuk semua test tanpa flag env.
- Mencetak header/body sensitif ke console/report.

## References
- https://playwright.dev/docs/api-testing
- https://playwright.dev/docs/test-fixtures
- https://playwright.dev/docs/best-practices
