/*
Define URls como:
http://localhost:3000/dashboard
http://localhost:3000/dashboard/new */

const express = require("express");
const router = express.Router();

const baseHtml = require("../helpers/baseHtml");
const authMiddleware = require("../middlewares/authMiddleware");

// ruta Protegida
router.get("/", authMiddleware, (req, res) => {
  res.send(baseHtml("Dashboard", "<h1>Dashboard funcionando ✅</h1>", req));
});

// ruta libre (sin middleware)
router.get("/new", (req, res) => {
  const form = `
    <h1>Crear producto</h1>

    <form method="POST" action="/products">
      <label>Nombre:</label><br/>
      <input name="name" required /><br/>

      <label>Descripción:</label><br/>
      <textarea name="description" required></textarea><br/>

      <label>Precio:</label><br/>
      <input type="number" name="price" step="0.01" required /><br/>

      <label>Imagen:</label><br/>
      <input name="image" required /><br/>

      <label>Categoría:</label><br/>
      <select name="category" required>
        <option value="Camisetas">Camisetas</option>
        <option value="Pantalones">Pantalones</option>
        <option value="Zapatos">Zapatos</option>
        <option value="Accesorios">Accesorios</option>
      </select><br/>

      <label>Talla:</label><br/>
      <select name="size" required>
        <option value="XS">XS</option>
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="L">L</option>
        <option value="XL">XL</option>
      </select><br/><br/>

      <button type="submit">Crear</button>
    </form>
  `;

  res.send(baseHtml("Nuevo producto", form, req));
});

module.exports = router;