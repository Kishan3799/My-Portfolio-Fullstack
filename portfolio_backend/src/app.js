import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

const crossOptions = {
    allowedHeaders:['X-Requested-With', 'X-HTTP-Method-Override', 'Content-Type', 'Accept'],
    methods:['GET', 'POST', 'PUT','DELETE','OPTIONS', 'PATCH'],
    origin:process.env.CORS_ORIGIN,
    credentials: true,
    optionsSuccessStatus: 200,
}

app.use(cors(crossOptions));
app.use(express.json({limit:"50mb"}))
app.use(express.urlencoded({extended:true, limit:"50mb"}))
app.use(express.static("public"))
app.use(cookieParser())

//import routes
import userRouter from "./routes/user.routes.js"
import aboutRouter from "./routes/about.routes.js"
import projectRouter from "./routes/project.routes.js"
import blogRouter from "./routes/blog.routes.js"
import contactRouter from "./routes/contact.routes.js"

//routes decleration
// http://localhost:8000/api/v1/admin_user/login
// http://localhost:8000/api/v1/admin_user/logout
// http://localhost:8000/api/v1/admin_user/isLoggedIn
app.use("/api/v1/admin_user", userRouter)


// http://localhost:8000/api/v1/about/add_about
// http://localhost:8000/api/v1/about/edit_about_detail
// http://localhost:8000/api/v1/about/update_profile_picture
// http://localhost:8000/api/v1/about/get_about_detail
// http://localhost:8000/api/v1/about/delete-about-detail
app.use("/api/v1/about", aboutRouter)

// http://localhost:8000/api/v1/projects/create_project
// http://localhost:8000/api/v1/projects/project/id
// http://localhost:8000/api/v1/projects/update_project/id
// http://localhost:8000/api/v1/projects/all_projects
// http://localhost:8000/api/v1/projects/delete_project/:id

app.use("/api/v1/projects", projectRouter)

// http://localhost:8000/api/v1/blogs/create_blog
// http://localhost:8000/api/v1/blogs/blog/id
// http://localhost:8000/api/v1/blogs/update_blog/id
// http://localhost:8000/api/v1/blogs/all_blogs
// http://localhost:8000/api/v1/blogs/delete-blog/id
app.use("/api/v1/blogs", blogRouter)

// http://localhost:8000/api/v1/contact
// http://localhost:8000/api/v1/all_contact
app.use("/api/v1", contactRouter)




export { app }