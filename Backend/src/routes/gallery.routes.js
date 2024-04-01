import { Router } from "express";
const router = Router();
import { verifyAdmin } from "../middlewares/auth.middleware.js";

import {
	addImage,
	getImages,
	updateImage,
	deleteImage,
} from "../controllers/gallery.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

router.route("/add-image").post(verifyAdmin, upload.single("image"), addImage);
router.route("/get-images").get(verifyAdmin, getImages);
router.route("/update-image").patch(verifyAdmin, upload.single("image"), updateImage);
router.route("/delete-image").delete(verifyAdmin, deleteImage);

export default router;
