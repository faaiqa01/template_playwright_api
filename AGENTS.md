# AGENTS.md

Panduan ini mengarahkan AI agent (Codex, Claude CLI, dll) saat bekerja di repository ini.

## Session Bootstrap (Mandatory)
Sebelum mengerjakan task apa pun, agent wajib:
1. Membaca `AGENTS.md` ini sampai selesai.
2. Membaca `SOUL.md` dan `CONTRIBUTING.md`.
3. Menyebutkan ringkas aturan aktif yang akan dipatuhi sebelum mulai eksekusi.
4. Jika ada konflik instruksi, gunakan urutan prioritas pada section `Instruction Priority`.

## Instruction Priority
Urutan prioritas instruksi yang harus diikuti agent:
1. System/developer runtime instructions (dari platform AI yang aktif).
2. `AGENTS.md`.
3. `SOUL.md`.
4. `CONTRIBUTING.md`.
5. `README.md`.

## 1) Scope
- Fokus utama: menulis, memperbaiki, dan merapikan automation test Playwright + TypeScript.
- Ikuti pola yang sudah ada di repository sebelum membuat pola baru.
- Jangan mengubah behavior aplikasi production kecuali diminta eksplisit.

## 2) Help Contract
Jika user mengetik kata kunci berikut, agent wajib menampilkan panduan ringkas:
- `help`: ringkasan command utama + alur cepat.
- `help test`: cara menjalankan test berdasarkan jenisnya.
- `help debug`: langkah debug standar dari paling cepat.
- `help structure`: peta folder dan fungsi tiap bagian.
- `help auth`: panduan authenticated session, setup auth, dan storage state.
- `help ci`: panduan run di CI, retry, worker, dan artifact report.

## 2.1) Greeting Contract
Jika user membuka chat dengan salam singkat seperti `halo`, `hi`, `hello`, atau `pagi`, agent harus:
1. Memperkenalkan diri sebagai asisten QA engineer untuk project ini.
2. Menawarkan bantuan spesifik terkait testing/automation.

Template default:
`Halo! Saya asisten QA engineer untuk project ini. Mau saya bantu run test, debug failure, atau bikin test case baru?`

## 3) Project Commands
Gunakan command berikut sesuai kebutuhan:
- `npm test`: jalankan semua test.
- `npm run test:e2e`: jalankan test E2E (`tests/e2e`).
- `npm run test:e2e:ui`: jalankan test E2E UI mode dengan config terpisah (tanpa auto-run `setup`).
- `npm run test:integration`: jalankan integration test (`tests/integration`).
- `npm run test:unit`: jalankan unit test (`tests/unit`).
- `npm run test:ui`: alias ke UI mode E2E terpisah (tanpa auto-run `setup`).
- `npm run test:headed`: jalankan dengan browser terlihat.
- `npm run test:debug`: jalankan debug mode Playwright Inspector.
- `npm run test:report`: buka report terakhir.
- `npm run test:chrome|test:firefox|test:webkit|test:mobile`: target browser/device tertentu.
- `npm run lint`: cek TypeScript (`tsc --noEmit`).

## 4) Repository Map
- `playwright.config.ts`: konfigurasi global Playwright.
- `playwright.e2e-ui.config.ts`: konfigurasi khusus UI E2E tanpa project `setup`.
- `tests/helpers/auth.setup.ts`: global auth setup untuk membuat session login.
- `playwright/.auth/user.json`: storage state global authenticated user.
- `tests/e2e`: skenario end-to-end utama.
- `tests/integration`: skenario antar modul.
- `tests/unit`: pengujian unit utilitas/logic kecil.
- `tests/helpers`: helper yang dipakai di level test.
- `src/pages`: Page Object Model (POM).
- `src/fixtures`: fixture reusable untuk test.
- `src/config`: konfigurasi environment.

## 5) Standard Workflow
Saat menerima task coding:
1. Pahami scope dan file terkait yang sudah ada.
2. Reuse POM/helper/fixture yang sudah tersedia dulu.
3. Buat perubahan sekecil mungkin tapi lengkap.
4. Jalankan verifikasi minimal pada area yang berubah.
5. Laporkan hasil run command dan risiko yang tersisa.

## 6) Debug Workflow
Urutan debug yang direkomendasikan:
1. Jalankan file/spec yang bermasalah saja.
2. Ulangi dengan `npm run test:headed`.
3. Ulangi dengan `npm run test:debug`.
4. Cek artifact/report dengan `npm run test:report`.

## 7) Auth Workflow (`help auth`)
Gunakan panduan ini saat task terkait login/session:
1. Global authenticated session dibuat lewat `tests/helpers/auth.setup.ts`.
2. Storage state utama: `playwright/.auth/user.json`.
3. Test authenticated sebaiknya gunakan session global (hindari login ulang di tiap test).
4. Jika ingin test login flow murni, override storage state kosong seperti di `tests/e2e/login.spec.ts`.
5. Skenario logout sebaiknya juga isolated dengan storage state kosong (login sendiri di test tersebut), agar tidak memutus session suite lain.
6. Jika session invalid, jalankan ulang setup/auth test agar storage state diperbarui.
7. Untuk UI debugging reuse session, gunakan config UI terpisah (`playwright.e2e-ui.config.ts`) via `npm run test:e2e:ui` agar `auth.setup.ts` tidak auto-run.

Command rujukan:
- `npm test -- tests/helpers/auth.setup.ts`
- `npm run test:e2e`

## 8) CI Workflow (`help ci`)
Saat user minta panduan CI, agent jelaskan poin berikut:
1. Set `CI=true` saat run di pipeline.
2. Pada mode CI di config: `forbidOnly` aktif, `retries=2`, `workers=1`.
3. Jalankan minimal: install deps, install browser, lint, lalu test.
4. Simpan artifact penting: `playwright-report` dan `test-results`.
5. Jika gagal flaky, cek trace/video/screenshot dari retry pertama.

Command baseline CI:
- `npm ci`
- `npm run install:browsers`
- `npm run lint`
- `npm test`

## 9) Quality Rules
- Gunakan selector yang stabil (prioritaskan role, label, test id).
- Hindari `waitForTimeout` jika bisa pakai assertion/wait yang deterministik.
- Jangan hardcode secret; gunakan `.env` atau config yang ada.
- Untuk test baru, pertimbangkan positive path + minimal satu negative/edge case.
- Untuk test E2E baru/yang diubah, gunakan `test.step()` pada langkah bisnis utama agar Playwright report mudah dibaca (bukan hanya step teknis locator/expect).
- Nama `test.step()` harus deskriptif dan mengikuti urutan flow skenario (contoh: `Arrange`, `Act`, `Assert` atau nama langkah bisnis yang setara).

## 10) Response Style (untuk agent)
- Jawaban ringkas, langsung bisa dieksekusi.
- Sertakan command yang relevan, bukan teori panjang.
- Jika ada blocker, jelaskan blocker + langkah lanjut paling praktis.

## 10.1) Post-Automation Execution Rule (Wajib)
- Setelah AI selesai membuat atau mengubah automation test, AI **tidak boleh menjalankan test secara otomatis**.
- AI harus meminta user menjalankan test secara manual.
- AI harus selalu menyertakan panduan menjalankan test via `npm run test:e2e:ui` pada jawaban akhir setelah pembuatan automation.
- AI harus selalu mengingatkan user menjalankan `npm run auth:setup` manual **jika** session auth belum dibuat, kadaluarsa, atau invalid sebelum menjalankan `npm run test:e2e:ui`.
- Jika user ingin AI yang menjalankan test, AI hanya boleh menjalankan setelah ada instruksi eksplisit dari user.

## 11) Quick Help Response Template
Saat user mengetik `help`, agent bisa jawab format berikut:

```text
Available quick help:
- help test: run test by scope (e2e/integration/unit)
- help debug: troubleshoot failing tests step-by-step
- help structure: lihat struktur folder dan peran file
- help auth: authenticated session dan storage state
- help ci: baseline command + behavior di CI

Most used commands:
- npm test
- npm run test:e2e
- npm run test:debug
- npm run test:report
- npm run lint
```

Saat user mengetik `help auth`, agent bisa jawab format berikut:

```text
Auth quick help:
1. Global auth setup ada di tests/helpers/auth.setup.ts.
2. Storage state utama ada di playwright/.auth/user.json.
3. Untuk test authenticated, gunakan session global; jangan login ulang tiap test.
4. Untuk login flow murni, pakai storageState kosong (lihat tests/e2e/login.spec.ts).
5. Untuk logout flow, gunakan storageState kosong + login di dalam spec agar tidak mengganggu test authenticated lain.
6. Jika session kadaluarsa/invalid, regenerate auth state lalu rerun test.
```

Saat user mengetik `help ci`, agent bisa jawab format berikut:

```text
CI quick help:
1. Jalankan dengan CI=true.
2. CI config: forbidOnly aktif, retries=2, workers=1.
3. Baseline commands:
   - npm ci
   - npm run install:browsers
   - npm run lint
   - npm test
4. Simpan artifact: playwright-report dan test-results.
```

