//Conexión a MongoDB Atlas
const mongoose = require("mongoose"); //importa Mongoose

const connectDB = async () => {
  const uri =
    process.env.NODE_ENV === "test"
      ? process.env.MONGO_URI_TEST //base de datos para pruebas(test)
      : process.env.MONGO_URI; // base de datos para producción o desarrollo

  await mongoose.connect(uri); //Se conecta a MongoDB usando la URL elegida.
  console.log("MongoDB conectado");
};

module.exports = connectDB;
