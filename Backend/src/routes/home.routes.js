import { Router } from "express";
const router = Router();
import carouselRouter from "./carousel.routes.js";
import heroRowRouter from "./heroRow.routes.js";

router.use("/carousel", carouselRouter);
router.use("/hero-row", heroRowRouter);

export default router;
