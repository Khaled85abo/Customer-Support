import supertest from "supertest";
import app from "../../src/app";
import { ROLES } from "../../src/constants/employee";
const requestWithSupertest = supertest(app);

describe("404 endpoint", () => {
  test("GET / --> not-found", async () => {
    const res = await requestWithSupertest.get("/");
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

    // Get Get all client orders
    const myOrdersRes = await requestWithSupertest
      .get("/api/orders/my-orders")
      .set("Authorization", `Bearer ${res.body.token}`);

    expect(myOrdersRes.status).toBe(200);
    expect(myOrdersRes.body).toEqual(
      expect.objectContaining({
        orders: expect.any(Array),
      })
    );

    //POST Create a refund
  });
});

describe("Support agent endpoints", () => {
  test("POST /api/users/login/employee --> {toke:''}", async () => {
    // Login
    const res = await requestWithSupertest
      .post("/api/users/login/employee")
      .send({
        email: "johan@se.se",
        password: "123456",
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(res.status).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
      })
    );

    //Activate Account
    const activatedAccountRes = await requestWithSupertest
      .post("/api/users/activate")
      .send({ password: 123456 })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${res.body.token}`);
    expect(activatedAccountRes.status).toBe(200);
    expect(activatedAccountRes.body.user).toEqual(
      expect.objectContaining({
        activated: true,
      })
    );
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

    // Get Employee's roles
    const rolesRes = await requestWithSupertest
      .get("/api/users/roles")
      .set("Authorization", `Bearer ${res.body.token}`);
    expect(rolesRes.status).toBe(200);
    expect(rolesRes.body.ROLES.support_agent).toBe(ROLES.support_agent);

    // Get all support agents
    const supportAgentsRes = await requestWithSupertest
      .get("/api/users")
      .set("Authorization", `Bearer ${res.body.token}`);
    expect(supportAgentsRes.status).toBe(200);
    expect(supportAgentsRes.body).toEqual(
      expect.objectContaining({
        users: expect.any(Array),
      })
    );
    expect(supportAgentsRes.body.users.length).toBeGreaterThan(0);

    // Get Support agent by id --> user
    const singleSupportAgentRes = await requestWithSupertest
      .get(`/api/users/${supportAgentsRes.body.users[0]._id}`)
      .set("Authorization", `Bearer ${res.body.token}`);
    expect(singleSupportAgentRes.status).toBe(200);
    expect(singleSupportAgentRes.body.user.name).toBe(
      supportAgentsRes.body.users[0].name
    );

    // Get Support agent by id --> bad request id is not MongoDb id
    const badIdRes = await requestWithSupertest
      .get(`/api/users/hej`)
      .set("Authorization", `Bearer ${res.body.token}`);
    expect(badIdRes.status).toBe(400);

    // Get Support agent by id --> not found
    const noneExistingAgentRes = await requestWithSupertest
      .get(`/api/users/63e95e625af8644416f1a590`)
      .set("Authorization", `Bearer ${res.body.token}`);
    expect(noneExistingAgentRes.status).toBe(404);

    // Create support agent
    const newAgent = {
      name: "007",
      email: "007@se.se",
      password: "123456",
    };
    const newAgentRes = await requestWithSupertest
      .post("/api/users")
      .send(newAgent)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${res.body.token}`);
    console.log("new agent created: ", newAgentRes.body.user.name);

    expect(newAgentRes.status).toBe(200);
    expect(newAgentRes.body.user.name).toBe("007");

    // Update support agent
    const updatedAgent = await requestWithSupertest
      .put(`/api/users/${newAgentRes.body.user._id}`)
      .send({ name: "008" })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${res.body.token}`);
    console.log("new agent created: ", updatedAgent.body.user.name);

    expect(updatedAgent.status).toBe(200);
    expect(updatedAgent.body.user.name).toBe("008");

    // Delete support agent
    const deleteRes = await requestWithSupertest
      .delete(`/api/users/${newAgentRes.body.user._id}`)
      .set("Authorization", `Bearer ${res.body.token}`);
    console.log("new agent deleted: ", deleteRes.body.message);

    expect(deleteRes.status).toBe(200);
    expect(deleteRes.body.message).toBe("support agent deleted");
  });
});

describe("Prducts endpoints", () => {
  test("GET  /api/products --> array of products", async () => {
    const productsRes = await requestWithSupertest.get("/api/products");
    expect(productsRes.status).toBe(200);
    expect(productsRes.body).toEqual(
      expect.objectContaining({
        page: 1,
        products: expect.any(Array),
      })
    );
    expect(productsRes.body.products.length).toBeGreaterThan(0);
  });

  test("GET /api/products/{id} --> Get a product", async () => {
    const id = "63e95e625af8644416f1a598";
    const productRes = await requestWithSupertest.get(`/api/products/${id}`);
    expect(productRes.status).toBe(200);
    expect(productRes.body.name).toBe("Sinus cap blue");
  });
});

describe("Orders endpoints", () => {
  // Get order by id
  test("GET /api/orders/:id --> order{}", async () => {
    const orderRes = await requestWithSupertest.get(
      "/api/orders/63ea74813a4a70089967bed3"
    );
    expect(orderRes.status).toBe(200);
    expect(orderRes.body.order).toEqual(
      expect.objectContaining({
        orderItems: expect.any(Array),
        _id: expect.any(String),
      })
    );
  });

  // authenticate user by order number
  test("Get /api/orders/authenticate.:id", async () => {
    const orderAuthenticated = await requestWithSupertest.get(
      "/api/orders/authenticate/63ea74813a4a70089967bed3"
    );
    expect(orderAuthenticated.status).toBe(200);
    expect(orderAuthenticated.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
      })
    );
  });
});
