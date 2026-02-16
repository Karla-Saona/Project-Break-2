//base CRUD de productos.Funciones para mostar productos,por id, crear, actualizar y borrar. Además de editar.
// Se usa HTML + redirect. Pero tb se usa JSON (Postman)
//Importaciones
const Product = require("../models/Product");

const templateProducts = require("../helpers/template");
const templateOne = require("../helpers/templateOne");
const baseHtml = require("../helpers/baseHtml");
const templateEdit = require("../helpers/templateEdit");


// GET ALL. Ver todos los productos (HTML)
const showProducts = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};

    const products = await Product.find(filter);

    const title = category ? `Products - ${category}` : "Products";
    const content = templateProducts(products);

    res.send(baseHtml(title, content, req));
  } catch (error) {
    res.status(500).send(baseHtml("Error", "<p>Error getting products</p>", req));
  }
};

// GET ONE. Ver un producto por su id (HTML)
const showProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res
        .status(404)
        .send(baseHtml("Not found", "<p>Producto no encontrado</p>", req));
    }

    const content = templateOne(product);
    res.send(baseHtml(product.name, content, req));
  } catch (error) {
    res.status(500).send(baseHtml("Error", "<p>Error getting product</p>", req));
  }
};

// CREATE. Crear un producto
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    // Si viene de Postman/tests (JSON), devolvemos JSON
    const wantsJson =
      req.headers["content-type"]?.includes("application/json") ||
      req.headers["accept"]?.includes("application/json");

    if (wantsJson) {
      return res.status(201).json(product);
    }

    // Si viene de formulario web, redirigimos
    return res.redirect("/products");
  } catch (error) {
    return res
      .status(500)
      .send(baseHtml("Error", "<p>Error creating product</p>", req));
  }
};


// UPDATE. Actualizar un producto(JSON)
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true //devuelve el actualizado
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error updating product" });
  }
};

// DELETE. Eliminar un producto (JSON)
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product" });
  }
};

// EDIT FORM. Ver formulario de edición (HTML)
const showEditForm = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res
        .status(404)
        .send(baseHtml("Not found", "<p>Producto no encontrado</p>", req));
    }

    const content = templateEdit(product);
    res.send(baseHtml("Editar producto", content, req));
  } catch (error) {
    res.status(500).send(baseHtml("Error", "<p>Error loading edit form</p>", req));
  }
};

// UPDATE FROM FORM. Actualizar un producto desde formulario (HTML)
const updateProductFromForm = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!product) {
      return res
        .status(404)
        .send(baseHtml("Not found", "<p>Producto no encontrado</p>", req));
    }
    res.redirect("/products");
  } catch (error) {
    res.status(500).send(baseHtml("Error", "<p>Error updating product</p>", req));
  }
};

// DELETE FROM FORM. Eliminar un producto desde formulario (HTML)
const deleteProductFromForm = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res
        .status(404)
        .send(baseHtml("Not found", "<p>Producto no encontrado</p>", req));
    }

    res.redirect("/products");
  } catch (error) {
    res.status(500).send(baseHtml("Error", "<p>Error deleting product</p>", req));
  }
};


module.exports = {
  showProducts,
  showProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  showEditForm,
  updateProductFromForm,
  deleteProductFromForm,
};

