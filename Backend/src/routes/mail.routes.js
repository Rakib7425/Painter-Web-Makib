import { Router } from "express";
import { sendMail } from "../controllers/mail.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/sendMail").post(verifyJWT, sendMail);

export default router;
