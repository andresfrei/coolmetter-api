import { Router } from "express";
import { getShop } from "../../controllers/admin/shopController.js";

const router = Router();

// Shop routes
router.get("/:id", getShop);
/**
 * @swagger
 * /admin/shop/{id}:
 *  get:
 *    summary: Datos del shop
 *    parameters:
 *      in: path
 *      name: id
 *      required: true
 *      description: the shop id
 *    tags: [Account]
 *    responses:
 *      201:
 *        description: Devuelve los datos del shop
 *    security:
 *      - bearerAuth: []
 */

export default router;
