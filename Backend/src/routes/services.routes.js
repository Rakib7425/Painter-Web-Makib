import { Router } from "express";
const router = Router();
import { verifyAdmin } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

import {
	addService,
	getServices,
	updateService,
	deleteService,
} from "../controllers/service.controller.js";

router.route("/add-service").post(verifyAdmin, upload.single("image"), addService);
router.route("/get-services").get(getServices); // Public Route
router.route("/update-service").patch(verifyAdmin, upload.single("image"), updateService);
router.route("/delete-service").delete(verifyAdmin, deleteService);

export default router;
