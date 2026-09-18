import { Elysia, t } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { db } from "./db";
import { users } from "./db/schema";

const port = Number(process.env.PORT) || 3000;

export const app = new Elysia()
  .use(
    swagger({
      documentation: {
        info: {
          title: "API Elysia + Drizzle + MySQL",
          version: "1.0.0",
          description: "Dokumentasi API backend",
        },
      },
    })
  )
  .get("/", () => ({
    status: "ok",
    message: "Server Elysia berjalan lancar!",
    timestamp: new Date().toISOString(),
  }))
  .group("/users", (app) =>
    app
      .get("/", async () => {
        try {
          const allUsers = await db.select().from(users);
          return {
            success: true,
            data: allUsers,
          };
        } catch (error: any) {
          return {
            success: false,
            message: "Gagal mengambil data users atau database belum siap.",
            error: error.message,
          };
        }
      })
      .post(
        "/",
        async ({ body, set }) => {
          try {
            await db.insert(users).values(body);
            set.status = 201;
            return {
              success: true,
              message: "User berhasil ditambahkan",
              data: body,
            };
          } catch (error: any) {
            set.status = 500;
            return {
              success: false,
              message: "Gagal menambahkan user",
              error: error.message,
            };
          }
        },
        {
          body: t.Object({
            name: t.String(),
            email: t.String({ format: "email" }),
          }),
        }
      )
  )
  .listen(port);

console.log(`🦊 Elysia berjalan di http://${app.server?.hostname}:${app.server?.port}`);
console.log(`📚 Swagger dokumentasi tersedia di http://${app.server?.hostname}:${app.server?.port}/swagger`);
