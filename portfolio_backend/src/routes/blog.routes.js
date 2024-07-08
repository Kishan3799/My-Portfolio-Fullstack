import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { getAllBlogs , getBlogById, createBlog, updateBlogById, deleteBlogById} from "../controllers/blog.controller.js";

const router = new Router();

//GET REQUEST --- GETING ALL BLOGS --- //// NO LOGIN REQUIRED \\\\
router.route("/all_blogs").get(getAllBlogs);

//GET REQUEST --- GETING SINGLE BLOG BY ID --- //// NO LOGIN REQUIRED \\\\
router.route("/blog/:id").get(getBlogById);

//POST REQUEST --- CREATING NEW BLOG --- //// LOGIN REQUIRED \\\\
router.route("/create_blog").post(
    verifyJwt,
    upload.fields([
        { name : "blog_cover_image", maxCount:1 },
    ]),
    createBlog
)


//PUT REQUEST --- UPDATING NEW BLOG BY ID --- //// LOGIN REQUIRED \\\\
router.route("/update_blog/:id").put(
    verifyJwt, 
    upload.fields([
        { name : "blog_cover_image", maxCount:1 },
    ]),
    updateBlogById)

// DELETE REQUEST --- DELETING CURRENT BLOG BI ID --- //// LOGIN REQUIRED \\\\
router.route("/delete-blog/:id").delete(verifyJwt, deleteBlogById)


export default router