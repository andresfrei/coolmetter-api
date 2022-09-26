import { Router } from "express";
import { getAccount } from "../../controllers/admin/accountController.js";
import { getShop } from "../../controllers/admin/shopController.js";

const router = Router();

// Acount routes
router.get("/account", getAccount);

// Shop routes
router.get("/shop/:id", getShop);

export default router;
