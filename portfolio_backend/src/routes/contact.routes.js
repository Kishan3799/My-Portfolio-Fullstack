import { Router } from "express";
import { createContact, getAllContact } from "../controllers/contact.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/contact").post(upload.none(),createContact)

router.route("/all_contact").get(verifyJwt, getAllContact)


export default router;

