//Librerías importadas
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const mongoSanitize = require("express-mongo-sanitize");
//Componentes míos que voy a utilizar
const HTTPSTATUSCODE = require("./utils/httpStatusCode");
const connectMongo = require("./utils/db");
connectMongo();
const { isAuth } = require('./src/middlewares/auth.middleware');
const app = express();


app.use(
  cors({
    // Permitir acceso desde cualquier origen
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));
app.set("secretKey", "nodeRestApi");

app.use(mongoSanitize());
app.use(express.json());

/* ROUTES */
const bookRouter = require("./src/routes/book.routes.js");
const userRouter = require("./src/routes/user.routes.js");
app.use("/api/books", bookRouter);
app.use("/api/users", userRouter);

app.get("/", (request, response) => {
  response.status(200).json({
    message: "Welcome to server",
    app: "My App",
  });
});
//  MANEJO DE ERRORES
app.use((request, response, next) => {
  let error = new Error();
  error.status = 404;
  error.message = HTTPSTATUSCODE[404];
  next(error);
});

app.use((error, request, response, next) => {
  return response
    .status(error.status || 500)
    .json(error.message || "Unexpected error");
});

app.disable("x-powered-by");
/* DEFINIR EL PUERTO E INICIAR LA ESCUCHA */

app.listen(process.env.PORT, () => {
  console.log(`app runnin on port ${process.env.PORT}`);
});
