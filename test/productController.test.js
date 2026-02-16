const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../index");//importar servidor 
const Product = require("../models/Product"); // Acceso a la base de datos

describe("Products API", () => {
  // Asegurar el proyecto en entorno test
  beforeAll(() => {
    process.env.NODE_ENV = "test";
  });

  //  Limpia los productos creados por los tests para que no aparezcan en mi web
  afterEach(async () => {
    await Product.deleteMany({});
  });

  // Cierra la conexión con MongoDB al terminar todos los tests
  afterAll(async () => {
    await mongoose.connection.close();
  });

  //Verificar q todos los productos esten  bien
  test("GET /products devuelve 200", async () => {
    const res = await request(app).get("/products");
    expect(res.statusCode).toBe(200);
  });

  //Verificar cada producto
  test("POST /products crea un producto (201)", async () => {
    const newProduct = {
      name: "Test product",
      description: "Creado desde Jest",
      image: "https://via.placeholder.com/150",
      category: "Camisetas",
      size: "M",
      price: 10.99,
    };

    const res = await request(app).post("/products").send(newProduct);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.name).toBe("Test product");
  });

  //Verificar actualización del producto
  test("PUT /products/:id actualiza (200)", async () => {
    const create = await request(app).post("/products").send({
      name: "To Update",
      description: "Antes",
      image: "https://via.placeholder.com/150",
      category: "Camisetas",
      size: "S",
      price: 5.99,
    });

    const id = create.body._id;

    const update = await request(app).put(`/products/${id}`).send({
      price: 99.99,
    });

    expect(update.statusCode).toBe(200);
    expect(update.body.price).toBe(99.99);
  });

  //Verifica q se eliminó el producto
  test("DELETE /products/:id borra (200)", async () => {
    const create = await request(app).post("/products").send({
      name: "To Delete",
      description: "Borrar",
      image: "https://via.placeholder.com/150",
      category: "Camisetas",
      size: "L",
      price: 7.99,
    });

    const id = create.body._id;

    const del = await request(app).delete(`/products/${id}`);
    expect(del.statusCode).toBe(200);
  });
});
