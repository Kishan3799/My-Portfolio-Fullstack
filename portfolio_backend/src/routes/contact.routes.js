import { Router } from "express";
import { createContact } from "../controllers/contact.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/contact").post(upload.none(),createContact)


export default router;

