# Project API Backend (Bun + Elysia + Drizzle + MySQL)

Proyek backend RESTful API yang dibangun menggunakan runtime [Bun](https://bun.sh), web framework [Elysia JS](https://elysiajs.com), serta ORM [Drizzle](https://orm.drizzle.team) dengan database [MySQL](https://www.mysql.com).

## Fitur & Spesifikasi
- **Runtime**: Bun (TypeScript native & fast)
- **Web Framework**: Elysia JS (+ Swagger OpenAPI docs bawaan)
- **Database & ORM**: Drizzle ORM + MySQL (`mysql2` driver)
- **Schema Migrations**: Drizzle Kit

---

## Prasyarat
- [Bun](https://bun.sh) (v1.0+)
- Server MySQL yang sedang berjalan (lokal / container)

---

## Konfigurasi Environment
Salin file `.env.example` ke `.env`:
```bash
cp .env.example .env
```
Sesuaikan konfigurasi URL database di `.env`:
```env
DATABASE_URL="mysql://root:password@localhost:3306/nama_database"
PORT=3000
```

---

## Perintah Tersedia (Scripts)

| Perintah | Keterangan |
|---|---|
| `bun run dev` | Menjalankan server dalam mode watch/pengembangan |
| `bun run start` | Menjalankan server dalam mode produksi |
| `bun run db:generate` | Membuat migration SQL dari skema TypeScript |
| `bun run db:push` | Menerapkan skema langsung ke database MySQL |
| `bun run db:migrate` | Menjalankan file migrasi yang telah di-generate |
| `bun run db:studio` | Membuka antarmuka Drizzle Studio di browser |
| `bun test` | Menjalankan unit testing |

---

## Endpoint API
- `GET /` - Health check status server
- `GET /swagger` - Dokumentasi interaktif Swagger OpenAPI
- `GET /users` - Mengambil daftar user dari tabel `users`
- `POST /users` - Menambahkan user baru (Body: `{ "name": string, "email": string }`)
