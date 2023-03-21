import "dotenv/config.js";
import express from "express";
import cors from "cors";

import http from "http";
import { Server as WebSocketServer } from "socket.io";
import Sockets from "./lib/sockets.js";
import { socketMiddleware } from "./middleware/socket.js";

import dbConnect from "./config/database.js";
import cookieParser from "cookie-parser";

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

const whiteList = ["http://localhost:3000"];

app.use(cors({ origin: whiteList }));

const filesStoage = path.join(__dirname, "storege");
const pathViews = path.join(__dirname, "views");
const pathPublic = path.join(__dirname, "public");

// Config
app.set("views", pathViews);
app.set("view engine", "ejs");

// Middlewares
app.use(express.static(pathPublic));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(multer({ dest: filesStoage }).single("csv"));
app.use(cookieParser());

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use("/api", router);

dbConnect();

const server = http.createServer(app);

export const io = new WebSocketServer(server, {
  cors: {
    origin: "*",
  },
});
io.use(socketMiddleware);
Sockets(io);

const port = process.env.PORT || 3001;

server.listen(port, () => {
  console.log(`Server on port ${port}`);
});
