import { Router } from "express";
const router = Router();
import { verifyAdmin } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

import {
	addHeroRow,
	getHeroRows,
	updateHeroRow,
	deleteHeroRow,
} from "../controllers/heroRow.controller.js";

router.route("/add-hero-row").post(verifyAdmin, upload.single("image"), addHeroRow);
router.route("/get-hero-rows").get(getHeroRows); // Public Route
router.route("/update-hero-row").patch(verifyAdmin, upload.single("image"), updateHeroRow);
router.route("/delete-hero-row").delete(verifyAdmin, deleteHeroRow);

export default router;
