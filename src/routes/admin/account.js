import { Router } from "express";
import { getAccount } from "../../controllers/admin/accountController.js";

const router = Router();

// Shop routes
router.get("/", getAccount);
/**
 * @swagger
 * /admin/account:
 *  get:
 *    summary: Datos de la cuenta
 *    tags: [Account]
 *    responses:
 *      201:
 *        description: Devuelve los datos de la cuenta
 *    security:
 *      - bearerAuth: []
 */

export default router;
