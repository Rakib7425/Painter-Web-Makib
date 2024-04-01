import { Router } from "express";
const router = Router();
import { verifyAdmin } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import carouselRouter from "./carousel.routes.js";
import {} from "../controllers/home.controller.js";
router.use("/carousel", carouselRouter);

export default router;
