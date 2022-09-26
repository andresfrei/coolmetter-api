import "dotenv/config.js";
import express from "express";
import cors from "cors";

import dbConnect from "./config/database.js";
import session from "express-session";

import morgan from "morgan";
import multer from "multer";

import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { swaggerOptions } from "./config/swagger.js";

import { router } from "./routes/index.js";

import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());

const filesStoage = path.join(__dirname, "storege");
const pathViews = path.join(__dirname, "views");
const pathPublic = path.join(__dirname, "public");

//Config
app.set("views", pathViews);
app.set("view engine", "ejs");

//Middlewares
app.use(express.static(pathPublic));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(multer({ dest: filesStoage }).single("csv"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//Routes
app.use("/", router);

dbConnect();

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
