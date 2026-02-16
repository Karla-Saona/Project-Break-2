//Cargar variables, importaciones y conectar a la DB
require("dotenv").config();
const express = require("express");
const session = require("express-session");

const connectDB = require("./config/db");
connectDB();

const app = express(); //crear app

// Middlewares body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// arxius estáticos(css + img)
app.use(express.static("public"));

// Sesion (antes de rutas)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "super-secret",
    resave: false,
    saveUninitialized: false,
  })
);

// Rutas
const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

// Dashboard SIN middleware global 
const dashboardRoutes = require("./routes/dashboardRoutes");
app.use("/dashboard", dashboardRoutes);

const baseHtml = require("./helpers/baseHtml");
const productRoutes = require("./routes/productRoutes");
app.use("/products", productRoutes);


//ruta principal
app.get("/", (req, res) => {
  res.send(baseHtml("Home", "<h1>Bienvenidos</h1>", req));
});


//levantar servidor
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`✅ Server on ${PORT}`);
  });
}

module.exports = app;

//http://localhost:3000