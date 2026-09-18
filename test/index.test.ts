import { describe, expect, it } from "bun:test";
import { app } from "../src/index";

describe("Elysia Server Test", () => {
  it("GET / returns status ok", async () => {
    const response = await app.handle(new Request("http://localhost:3000/"));
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.status).toBe("ok");
    expect(data.message).toBe("Server Elysia berjalan lancar!");
  });
});
