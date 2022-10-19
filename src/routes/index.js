import { Router } from "express";
import accountToken from "../middleware/accountToken.js";

import auth from "./auth/index.js";
import shop from "./shop/index.js";
import order from "./order/index.js";
import admin from "./admin/index.js";

export const router = Router();

//Admin Routes
router.use("/admin", accountToken, admin);

//Auth Routes
router.use("/auth", auth);

//API Routes
router.use("/shop", shop);
router.use("/order", order);

router.get("/", (req, res) => {
  res.render("index");
});

router.get("*", (req, res) => {
  res.status(404);
  res.render("404");
});
