import request from "supertest";
import app from "../src/index.js";
import db from "../src/db.js";

beforeEach(() => {
  const initial = [
    { id: "p1", stock: 10 },
    { id: "p2", stock: 5 },
    { id: "p3", stock: 20 },
    { id: "p4", stock: 3 },
  ];
  initial.forEach((i) => {
    const prod = db._internal.PRODUCTS.find((p) => p.id === i.id);
    if (prod) prod.stock = i.stock;
  });
  db.clearCart();
});

test("GET /products returns product list", async () => {
  const res = await request(app).get("/products");
  expect(res.status).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
  expect(res.body.length).toBeGreaterThan(0);
});

test("Add item to cart and calculate total", async () => {
  const addRes = await request(app)
    .post("/cart/add")
    .send({ productId: "p1", quantity: 2 });
  expect(addRes.status).toBe(201);
  const cartRes = await request(app).get("/cart");
  expect(cartRes.status).toBe(200);
  expect(cartRes.body.subtotal).toBeGreaterThan(0);
  expect(cartRes.body.items.find((i) => i.id === "p1").quantity).toBe(2);
});

test("Apply discount code SAVE10", async () => {
  await request(app).post("/cart/add").send({ productId: "p2", quantity: 1 });
  const res = await request(app)
    .post("/cart/apply-discount")
    .send({ code: "SAVE10" });
  expect(res.status).toBe(200);
  const cartRes = await request(app).get("/cart");
  expect(cartRes.body.discount).not.toBeNull();
  expect(cartRes.body.discount.code).toBe("SAVE10");
});
