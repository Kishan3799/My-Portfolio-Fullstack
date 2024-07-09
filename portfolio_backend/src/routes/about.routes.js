import { Router } from "express";
import { createAboutDetail, editDescription, updateProfileImage, getaboutDetail , deleteAboutMe} from "../controllers/about.controller.js";
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = new Router();

//create about detail
router.route("/add_about").post(
    verifyJwt,
    upload.fields([
        {
            name: "profileImage",
            maxCount:1
        }
    ]),
    createAboutDetail
)

//upadate about detial
router.route("/edit_about_detail/:id").patch(verifyJwt,editDescription)

//update profile picture
router.route("/update_profile_picture/:id").patch(
    verifyJwt,
    upload.single("profileImage"),
    updateProfileImage
)

//get about detail
router.route("/get_about_detail").get(getaboutDetail)

// detete about detail
router.route("/delete-about-detail/:id").delete(verifyJwt, deleteAboutMe)

export default router