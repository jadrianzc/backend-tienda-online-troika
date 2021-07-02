/**
 * Configuración del servidor
 */
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const router = require("../routes/router");
const exphbs = require("express-handlebars");
const { getmongoose } = require("../config/database");
//const keepAlive = require("../utils/keepAlive");

const initServer = (port) => {
  const app = express();

  // Para parsear JSONs
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // Configuración motor de plantilla
  /*   app.engine('.hbs', exphbs)
  app.set('view engine', '.hbs') */

  // Para seguridad básica
  app.use(helmet());

  // Utilizar CORS
  app.use(cors());

  // Para un registro más detallado de las peticiones
  app.use(morgan("tiny"));

  // Guardar base de datos
  app.locals.db = getmongoose();

  // Inicializar rutas de la API
  app.get("/", (req, res) => {
    res.redirect(301, "/api/v1/");
  });
  app.use("/api/v1/", router);

  // keepAlive.wake();

  app.listen(port, () => {
    console.log(`Iniciado correctamente el servidor en el puerto: ${port}`);
  });
};

module.exports = { initServer };
