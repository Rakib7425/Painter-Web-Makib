import { Router } from "express";
const router = Router();
import { verifyAdmin } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
	addFooterData,
	updateFooterLogo,
	getFooterData,
	updateFooterData,
} from "../controllers/footer.controller.js";

router.route("/add-footer-data").post(verifyAdmin, upload.single("logo"), addFooterData);
router.route("/update-footer-logo").post(verifyAdmin, upload.single("logo"), updateFooterLogo);
router.route("/get-footer-data").get(getFooterData); // Public Route
router.route("/update-footer-data").patch(verifyAdmin, upload.single("logo"), updateFooterData);

export default router;
