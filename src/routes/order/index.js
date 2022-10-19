import express from "express";
import { emitMessage } from "../../controllers/shopController.js";

const router = express.Router();

router.post("/:id", emitMessage);

export default router;
