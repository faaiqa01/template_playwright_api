# AGENTS.md

Panduan AI agent untuk repository template **Playwright API Testing**.

## Session Bootstrap (Mandatory)
Sebelum task apa pun:
1. Baca `AGENTS.md` ini.
2. Baca `SOUL.md` dan `CONTRIBUTING.md`.
3. Sebutkan ringkas aturan aktif yang dipatuhi.
4. Jika konflik instruksi, gunakan urutan `Instruction Priority`.

## Instruction Priority
1. System/developer runtime instructions.
2. `AGENTS.md`.
3. `SOUL.md`.
4. `CONTRIBUTING.md`.
5. `README.md`.

## Scope
- Fokus: automation **API testing** dengan Playwright + TypeScript.
- Prioritaskan fixture `request` / `APIRequestContext`, bukan browser UI.
- Jangan ubah behavior production API kecuali diminta eksplisit.

## Help Contract
Jika user mengetik:
- `help`: ringkasan command utama.
- `help test`: cara jalankan smoke/integration/contract.
- `help debug`: langkah debug API test.
- `help structure`: peta folder API template.
- `help env`: setup environment variable dan auth token.
- `help ci`: baseline CI API tests.

## Greeting Contract
Jika chat dibuka dengan `halo|hi|hello|pagi`:
`Halo! Saya asisten QA engineer untuk project ini. Mau saya bantu run API test, debug failure, atau bikin test case baru?`

## Project Commands
- `npm test`: jalankan semua test.
- `npm run test:api`: jalankan seluruh API suite (`tests/api`).
- `npm run test:smoke`: jalankan smoke API.
- `npm run test:integration`: jalankan integration API.
- `npm run test:contract`: jalankan contract/schema API.
- `npm run test:debug`: jalankan Playwright debug mode.
- `npm run test:report`: buka report terakhir.
- `npm run lint`: cek TypeScript.

## Repository Map
- `playwright.config.ts`: konfigurasi API run.
- `tests/helpers/api-client.ts`: wrapper request reusable.
- `tests/helpers/api-fixtures.ts`: custom fixture `apiClient`.
- `tests/api/smoke`: health/smoke endpoint checks.
- `tests/api/integration`: multi-endpoint behavior checks.
- `tests/api/contract`: schema/shape validation.
- `src/config/api.config.ts`: konfigurasi runtime API.
- `src/fixtures/api.fixture.ts`: data builder test.

## Standard Workflow
1. Pahami endpoint + behavior yang diuji.
2. Reuse `apiClient` dan fixture yang sudah ada.
3. Buat perubahan kecil tapi lengkap.
4. Verifikasi command relevan (hanya jika user minta dijalankan).
5. Laporkan hasil dan risiko tersisa.

## Debug Workflow
1. Jalankan 1 spec yang gagal.
2. Jalankan mode debug (`npm run test:debug`).
3. Cek `test-results` dan `playwright-report`.
4. Ulangi dengan logging request/response terfokus.

## Env Workflow (`help env`)
1. Set `API_BASE_URL`.
2. Jika endpoint private, set `API_TOKEN`.
3. Atur timeout via `API_TIMEOUT_MS` bila perlu.
4. Jangan hardcode secret di test file.

## Logging Workflow
1. Logging hanya dikonfigurasi lewat satu file terpusat: `tests/helpers/logger.ts`.
2. Logging default minimal (tidak verbose) untuk run normal.
3. Aktifkan debug log hanya saat investigasi via `API_DEBUG=true`.
4. Gunakan `API_LOG_LEVEL` (`error|warn|info|debug`) untuk kontrol detail log.
5. Wajib redact/masking secret (`Authorization`, `API_TOKEN`, cookie, credential) dari output log.
6. Saat debug/CI failure, simpan log di `test-results` sebagai artifact pendukung.

## CI Workflow (`help ci`)
1. Set `CI=true`.
2. CI config: `forbidOnly=true`, `retries=2`, `workers=1`.
3. Baseline:
   - `npm ci`
   - `npm run install:browsers`
   - `npm run lint`
   - `npm test`
4. Simpan artifact: `playwright-report`, `test-results`.

## Quality Rules
- Pakai `APIRequestContext` via fixture, bukan raw fetch acak.
- Assertion wajib spesifik: status code + body contract minimal.
- Gunakan `test.step()` untuk langkah bisnis utama.
- Tambahkan positive path + minimal satu negative/edge case.
- Hindari data random yang membuat flaky kecuali dibutuhkan.
- Logging request/response harus terfokus dan tidak membocorkan secret.
- Dilarang membuat logger terpisah per spec/helper; wajib reuse logger terpusat.
- **Wajib gunakan Test Case ID (`TC ID`) pada setiap judul test**.
- Format wajib: `[TC-<DOMAIN>-<3DIGIT>] <deskripsi test>`.
- Contoh: `[TC-AUTH-001] login success then get auth user`.

## Response Style
- Ringkas, langsung eksekusi.
- Sertakan command praktis.
- Jika blocker, jelaskan blocker + langkah lanjut.

## Post-Automation Execution Rule (Wajib)
- Setelah membuat/mengubah automation test, AI **tidak boleh** menjalankan test otomatis.
- AI harus meminta user menjalankan test manual.
- AI harus menyertakan panduan run minimal `npm run test:api` pada jawaban akhir.
- AI hanya boleh menjalankan test jika user memberi instruksi eksplisit.
