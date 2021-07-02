const mongoose = require("mongoose");
require("dotenv").config();

//const URI = MONGO_URI;

const getmongoose = async () => {
  try {
    // Objeto de base de datos
    mongoose.connect(process.env.MONGO_URI);

    console.log("Obtenido objeto de la base de datos...");

    // Retorna el objeto
    return mongoose;
  } catch (err) {
    console.error(`No se pudo conectar: ${err}`);
  }
};

module.exports = { getmongoose };
