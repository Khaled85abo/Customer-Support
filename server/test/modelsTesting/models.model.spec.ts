import {
  connectDBForTesting,
  disconnectDBForTesting,
} from "./connectDBForTesting";

import Client, { IClient } from "../../src/models/client.model";

describe("Mongoose Models Testing", () => {
  beforeAll(async () => {
    await connectDBForTesting();
  });

  afterAll(async () => {
    await disconnectDBForTesting();
  });

  test("clientModel Get Test", async () => {
    const fetchedClient = await Client.findOne({
      _id: "63e95e625af8644416f1a591",
    });
    expect(fetchedClient).toBeDefined();
    expect(fetchedClient?.name).toBe("su");
    expect(fetchedClient?.email).toBe("su@se.se");
    expect(fetchedClient?.password).toBe(
      "$2a$10$WSfarfr4MwyKdqLyPmTSUOD9O7DKcVokUreGM7uLc9mOehGgCqPiq"
    );
  });

  const newClient: Partial<IClient> = {
    name: "new client",
    email: "test.client@se.se",
    password: "123456",
  };
  test("clientModel, Create support agent", async () => {
    const client = await Client.create(newClient);
    expect(client).toBeDefined();
    expect(client.name).toBe(newClient.name);
    expect(client.email).toBe(newClient.email);
    expect(client.password).not.toBe(newClient.password);
  });

  test("clientModel Delete Test", async () => {
    await Client.deleteOne({ email: newClient.email });
    const deletedClient = await Client.findOne({ email: newClient.email });
    expect(deletedClient).toBeNull();
  });
});
