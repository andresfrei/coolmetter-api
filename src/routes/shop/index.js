import express from "express";
import { getShop } from "../../controllers/shopController.js";

const router = express.Router();

router.get("/:uid", getShop);

export default router;
