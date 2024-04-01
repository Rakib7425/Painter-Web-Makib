import { Router } from "express";
const router = Router();
import { verifyAdmin } from "../middlewares/auth.middleware.js";
import { addMember,getMembers,updateMember,deleteMember } from "../controllers/team.controller.js";
 
router.route("/add-member").post(verifyAdmin, addMember);
router.route("/get-members").get(verifyAdmin, getMembers);
router.route("/update-member").patch(verifyAdmin, updateMember);
router.route("/delete-member").delete(verifyAdmin, deleteMember);

export default router;
