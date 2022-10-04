import { Router } from "express";
import accountToken from "../middleware/accountToken.js";

import auth from "./auth.js";
import shop from "./shop.js";
import admin from "./admin/index.js";

export const router = Router();

//Admin Routes
router.use("/admin", accountToken, admin);

//Auth Routes
router.use("/auth", auth);

//API Routes
router.use("/api/shop", shop);

router.get("/", (req, res) => {
  res.render("index");
});

router.get("*", (req, res) => {
  res.status(404);
  res.render("404");
});
