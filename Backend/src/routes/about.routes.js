import { Router } from "express";
const router = Router();
import { verifyAdmin } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { addAbout, getAbout, updateAbout } from "../controllers/about.controller.js";

router.route("/add-about").post(verifyAdmin, upload.single("photo"), addAbout);
router.route("/get-about").get(getAbout); // Public Route
router.route("/update-about").patch(verifyAdmin, upload.single("photo"), updateAbout);

export default router;
