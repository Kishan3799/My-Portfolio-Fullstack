import { Router } from "express";
import { loginAdmin, loggout, checkAuth } from "../controllers/user.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
const router = Router()

router.route("/login").post(loginAdmin)

//secure Route
router.route("/logout").post(verifyJwt, loggout)

router.route("/isLoggedIn").get(verifyJwt,checkAuth)

export default router