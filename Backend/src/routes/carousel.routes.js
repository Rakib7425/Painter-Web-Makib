import { Router } from "express";
const router = Router();
import { verifyAdmin } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
	addCarouselImage,
	getCarouselImages,
	updateCarouselImage,
	deleteCarouselImage,
} from "../controllers/carousel.controller.js";

router.route("/add-image").post(verifyAdmin, upload.single("image"), addCarouselImage);
router.route("/get-images").get(getCarouselImages); // Public Route
router.route("/update-image").patch(verifyAdmin, upload.single("image"), updateCarouselImage);
router.route("/delete-image").delete(verifyAdmin, deleteCarouselImage);

export default router;
