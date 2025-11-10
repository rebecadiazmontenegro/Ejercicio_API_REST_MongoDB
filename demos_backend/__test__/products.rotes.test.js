// Supertest
const supertest = require("supertest");
// Server express
const server = require("../../server.js");
// Conexión mongo. Lanza la BBDD
const mongoose = require("../config/db_mongo");
// Lanzar server con supertest --> npm start
const request = supertest(server);

// beforeEach
// afterEach
// beforeAll
// afterAll

afterAll(async () => {
  // Cierra el servidor express
  //await server.close();
  // Cierra conexión de mongoose
  await mongoose.connection.close();
});

it("Probando JEST", () => {
  expect(1).toBe(1);
});

describe("GET all products", () => {
  it("GET test /api/products should return 200", async () => {
    await request.get("/api/products").expect(200);
  });

  it("GET test /api/products should return an array", async () => {
    const response = await request.get("/api/products").expect(200);
    expect(response.body).toEqual(expect.any(Array));
  });
});

describe("GET one product", () => {
  it("debería devolver un producto existente por su id", async () => {
    const response = await request.get("/api/products/3").expect(200);

    // Devuelve un array
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);

    const product = response.body[0];

    expect(product).toEqual(
      expect.objectContaining({
        id: 3,
        title: expect.any(String),
        price: expect.any(Number),
        description: expect.any(String),
        provider: expect.objectContaining({
          company_name: expect.any(String),
          cif: expect.any(String),
          adress: expect.any(String),
          url_web: expect.any(String),
        }),
      })
    );
  });

  it("debería devolver un array vacío si el producto no existe", async () => {
    const response = await request.get("/api/products/9999").expect(200);
    expect(response.body).toEqual([]); // array vacío, no objeto
  });
});

describe("POST one product", () => {
  it("debería guardar un producto válido", async () => {
    const newId = Math.floor(Math.random() * 10000);
    const response = await request
      .post("/api/products")
      .send({
        id: newId,
        title: "Cervezas Miércoles TB " + Math.random(),
        price: 10,
        description: "Vente de tarde y conoce a DS,FS,CYB,DevOps,UXUI,MKT",
        company_name: "La casa de las flores", // campo correcto
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201);

    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("product");
    expect(response.body.product).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        title: expect.any(String),
        price: expect.any(Number),
        description: expect.any(String),
        provider: expect.any(String) // ObjectId del provider
      })
    );
  });

  it("debería fallar al enviar un producto vacío", async () => {
    const response = await request
      .post("/api/products")
      .send({})
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toHaveProperty("msj");
  });

  it("debería fallar al enviar un producto con un campo obligatorio vacío", async () => {
    const response = await request
      .post("/api/products")
      .send({
        id: 14,
        title: "Cervezas Viernes TB",
        price: 0,
        description: "",
        company_name: "La casa de las flores",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toHaveProperty("msj");
  });

  it("debería fallar al enviar tipos de datos incorrectos", async () => {
    const response = await request
      .post("/api/products")
      .send({
        id: "abc",
        title: 1,
        price: "0",
        description: 0,
        company_name: 123,
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toHaveProperty("msj");
  });
});