const db = require("./index.js");

beforeAll(() => {
  db.connect();
});

it("Testing to see if Jest works", () => {
  expect(1).toBe(1);
});

afterAll(() => {
  db.end();
});
