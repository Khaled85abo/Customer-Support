import supertest from "supertest";
import app from "../../src/app";
import { ROLES } from "../../src/constants/employee";

const requestWithSupertest = supertest(app);

describe("404 endpoint", () => {
  test("GET / --> not-found", async () => {
    const res = await requestWithSupertest.get("/");
    console.log("res from endpoint /: ", res.status);

    expect(res.status).toEqual(404);
  });
});

describe("Client endpoints", () => {
  test("POST /api/users/login --> {toke:''}", async () => {
    const res = await requestWithSupertest
      .post("/api/users/login")
      .send({
        email: "su@se.se",
        password: "123456",
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.status).toBe(200);
  });
});

describe("Support agent endpoints", () => {
  test("POST /api/users/login/employee --> {toke:''}", async () => {
    const res = await requestWithSupertest
      .post("/api/users/login/employee")
      .send({
        email: "John@se.se",
        password: "123456",
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.status).toBe(200);
  });
});

describe("Admin enpoints", () => {
  test("POST /api/users/login/employee --> {toke:''} && /api/user/roles --> {ROLES:{}} ", async () => {
    // Login
    const res = await requestWithSupertest
      .post("/api/users/login/employee")
      .send({
        email: "admin@se.se",
        password: "123456",
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.status).toBe(200);

    // Get Roles
    requestWithSupertest
      .get("/api/users/roles")
      .set("Authorization", `Bearer ${res.body.token}`)
      .expect(200)
      .then((res) => {
        expect(res.body.ROLES.support_agent).toBe(ROLES.support_agent);
      });
  });
});

describe("Prducts endpoint", () => {
  test("GET  /api/products --> array of products", async () => {
    requestWithSupertest
      .get("/api/products")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            success: true,
            data: expect.any(Array),
          })
        );
        expect(res.body.data.length).toBeGreaterThan(2);
      });
  });

  test("GET /api/products/{id} --> Get a product", async () => {
    const id = "63e95e625af8644416f1a598";
    requestWithSupertest
      .get(`/api/products/${id}`)
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body.name).toBe("Sinus cap blue");
      });
  });
});
