import { Router } from "express";
import { createProject, updateProject, getAllProjects, getProjectById} from "../controllers/project.controller.js";
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = new Router();

//Post request login is required
router.route("/create_project").post(
    verifyJwt,
    upload.fields([
        {
            name:"project_image",
            maxCount:5
        },
        {
            name:"project_video",
            maxCount: 1
        }
    ]),
    createProject
)

//Put request for updation login is required
router.route("/update_project/:id").put(
    verifyJwt,
    upload.fields([
        {
            name:"project_image",
            maxCount:5,
        },
        {
            name:"project_video",
            maxCount:1,
        }
    ]),
    updateProject
)

//GET REQUEST FOR ALL PROJECT LOGIN IS NOT REQUIRED
router.route("/all_projects").get(getAllProjects);

//GET REQUEST FOR PROJECT BY ID LOGIN IS NOT REQUIRED
router.route("/project/:id").get(getProjectById);

//Get All Project no login required
export default router