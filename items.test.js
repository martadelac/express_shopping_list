process.env.NODE_ENV = "test";
// npm packages

const request = require("supertest");
const { response } = require("./app");
// app imports

const app = require("./app");

let items = require("./fakeDb");

let product = { name: "bananas", price: 1.25 };

//add item to "fakeDB"
beforeEach(async () => {
  items.push(product);
});
//reset "fakeDb"
afterEach(async () => {
  items = [];
});

describe("GET /items", () => {
  test("Get all items", async () => {
    const res = await request(app).get("/items");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ items: [product] });
  });
});

describe("POST /items", () => {
  test("Adding one item", async () => {
    const res = await request(app)
      .post("/items")
      .send({ name: "strawberries", price: 3.99 });
    expect(res.statusCode).toBe(201);
    // expect(res.body).toEqual({ item: { name: "strawberries", price: 3.99 } });
  });
});

describe("PATCH /items/:name", () => {
  test("Updating the name of a single item", async () => {
    const res = await request(app)
      .patch(`/items/${product.name}`)
      .send({ name: "watermelon" });
    expect(res.statusCode).toBe(200);
    expect(res.body.item).toEqual({ name: "watermelon" });
  });
});

describe("DELETE /items/:name", () => {
  test("Deleting one item by name", async () => {
    const res = await request(app).delete(`/items/${product.name}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: "Deleted" });
  });
});
