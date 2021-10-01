const router = require("../server/routes.js");
const db = require("../db/index.js");
const request = require("supertest");
const express = require("express");

let app = express();
let server;
let port = 3000 || process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use("/", router);

beforeAll((done) => {
  server = require("http").createServer(app);
  server.listen({ port }, done);
});

afterAll((done) => {
  server.close(done);
  db.endConnect();
});

const baseUser = { user_session: "1234" };

describe("GET products", () => {
  test("should GET from products", (done) => {
    const res = request(server)
      .get("/products")
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(200);
    done();
  });
});

describe("GET product information", () => {
  test("should GET from product information", (done) => {
    const productId = 1;
    const res = request(server)
      .get(`/products/${productId}`)
      .expect([
        {
          id: 1,
          name: "Camo Onesie",
          slogan: "Blend in to your crowd",
          description:
            "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
          category: "Jackets",
          default_price: 140,
          features: [
            {
              feature: "Fabric",
              value: "Canvas",
            },
            {
              feature: "Buttons",
              value: "Brass",
            },
          ],
        },
      ])
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(200);
    done();
  });
});

describe("GET related products", () => {
  test("should GET from related products", (done) => {
    const productId = 1;
    const res = request(server)
      .get(`/products/${productId}/related`)
      .expect([
        {
          id: 1,
          current_product_id: 1,
          related_product_id: 2,
        },
        {
          id: 2,
          current_product_id: 1,
          related_product_id: 3,
        },
        {
          id: 3,
          current_product_id: 1,
          related_product_id: 8,
        },
        {
          id: 4,
          current_product_id: 1,
          related_product_id: 7,
        },
      ])
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(200);
    done();
  });
});

describe("GET product styles", () => {
  test("should GET from product styles", (done) => {
    const productId = 1;
    const res = request(server)
      .get(`/products/${productId}/styles`)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(200);
    done();
  });
});

describe("GET from cart", () => {
  test("should GET from cart", (done) => {
    const res = request(server)
      .get("/cart")
      .set(baseUser)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(200);
    done();
  });
});

describe("POST to cart", () => {
  test("should POST to cart", (done) => {
    const res = request(server)
      .post("/cart")
      .set(baseUser)
      .set("Content-Type", "application/json")
      .send({
        product_id: "5",
        sku_id: "3",
        count: "9",
      })
      .expect(201);
    done();
  });
});
