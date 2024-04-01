import { Router } from "express";
const router = Router();
import { verifyAdmin } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
	addMember,
	getMembers,
	updateMember,
	deleteMember,
} from "../controllers/team.controller.js";

router.route("/add-member").post(verifyAdmin, upload.single("photo"), addMember);
router.route("/get-members").get(getMembers); // Public Route
router.route("/update-member").patch(verifyAdmin, upload.single("photo"), updateMember);
router.route("/delete-member").delete(verifyAdmin, deleteMember);

export default router;
