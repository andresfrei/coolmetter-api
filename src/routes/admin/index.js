import { Router } from "express";
import shop from "./shop.js";
import account from "./account.js";

const router = Router();

router.use("/account", account);
router.use("/shop", shop);

export default router;
