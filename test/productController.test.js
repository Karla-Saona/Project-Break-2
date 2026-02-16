//importaciones
const request = require("supertest");//hace peticiones
const mongoose = require("mongoose");
const app = require("../index"); // importar servidor
const Product = require("../models/Product"); // Acceso a la base de datos


//testear la API de los productos
describe("Products API", () => {

  // Asegurar el proyecto en entorno test. Se usa MONGO_URI_TEST
  beforeAll(() => {
    process.env.NODE_ENV = "test";
  });

  // Limpia los productos creados por los tests para que no aparezca en mi web
  afterEach(async () => {
    await Product.deleteMany({});
  });

  // Cierra la conexión con MongoDB al terminar todos los tests
  afterAll(async () => {
    await mongoose.connection.close();
  });

// Verificar GET
  test("GET /products devuelve 200", async () => {
    const res = await request(app).get("/products");
    expect(res.statusCode).toBe(200);
    expect(typeof res.text).toBe("string"); // devuelve HTML (no JSON)
  });


  // Verificar POST
  test("POST /products crea un producto (201) y devuelve JSON", async () => {
    const newProduct = {
      name: "Test product",
      description: "Creado desde Jest",
      image: "https://via.placeholder.com/150",
      category: "Camisetas",
      size: "M",
      price: 10.99,
    };

    const res = await request(app)
      .post("/products")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send(newProduct);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.name).toBe("Test product");
  });

  // Verificar PUT
  test("PUT /products/:id actualiza (200)", async () => {
    //creó un producto para poder actualizarlo después
    const create = await request(app) 
      .post("/products")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send({
        name: "To Update",
        description: "Antes",
        image: "https://via.placeholder.com/150",
        category: "Camisetas",
        size: "S",
        price: 5.99,
      });

    expect(create.statusCode).toBe(201);
    //me guardó el id del producto creado
    const id = create.body._id; 
    expect(id).toBeTruthy();

    // Enviamos la petición PUT para actualizar el producto
    const update = await request(app)
      .put(`/products/${id}`)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send({ price: 99.99 });

      //comprobar q la actualización fue correcta
    expect(update.statusCode).toBe(200);
    expect(update.body.price).toBe(99.99);
  });

  // Verifica DELETE
  test("DELETE /products/:id borra (200)", async () => {
    const create = await request(app)
      .post("/products")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send({
        name: "To Delete",
        description: "Borrar",
        image: "https://via.placeholder.com/150",
        category: "Camisetas",
        size: "L",
        price: 7.99,
      });

    expect(create.statusCode).toBe(201);
    const id = create.body._id;
    expect(id).toBeTruthy();

    const del = await request(app)
      .delete(`/products/${id}`)
      .set("Accept", "application/json");

    expect(del.statusCode).toBe(200);
  });
});