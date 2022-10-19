import express from "express";
import { validateLogin, validateRegister } from "../../validator/auth.js";
import { login, register } from "../../controllers/authController.js";

const router = express.Router();

router.post("/login", validateLogin, login);
/**
 * Post user login
 * @openapi
 * /auth/login:
 *    post:
 *      tags:
 *        - Login
 *      summary: "Login de usuario"
 *      description: Endpoint logueo de usuario de app
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/accountLogin"
 *      responses:
 *        '200':
 *          description: Retorna token validacion.
 *        '401':
 *          description: Error de validacion.
 */

router.post("/register", validateRegister, register);

export default router;
