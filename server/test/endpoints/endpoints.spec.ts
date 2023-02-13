import supertest from "supertest";
import app from "../../src/app";

const requestWithSupertest = supertest(app);

describe("Generic endpoints", () => {
  test("GET /", async () => {
    const res = await requestWithSupertest.get("/");
    console.log("res from endpoint /: ", res.status);

    expect(res.status).toEqual(404);
  });
  test("GET /api/products", async () => {
    const res = await requestWithSupertest.get("/api/products");
    expect(res.status).toEqual(200);
  });
});
