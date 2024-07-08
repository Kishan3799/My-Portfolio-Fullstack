import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Blog } from "../models/blog.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

//GET REQUEST FOR GETTING ALL BLOG
const getAllBlogs = asyncHandler( async (req, res)=>{
    const allBlogs = await Blog.find().populate('blog_auther', 'name');

    return res
        .status(200)
        .json(new ApiResponse(200, allBlogs, "Blogs fetched successfully"));
});

//GET REQUEST FOT GETTING SINGLE BLOG BY ID
const getBlogById = asyncHandler(async(req, res)=>{
    const blogId = req.params.id;
    const blogById = await Blog.findById(blogId);

    if(!blogById){
        throw new ApiError(404, "Blog not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, blogById, "Blog detail fetched Successfully")
        );
});

//POST REQUEST FOR CREATING NEW BLOG
const createBlog = asyncHandler(async( req, res)=>{
    const {blogTitle, blogShortSummary, blogContent } = req.body;

    if(
        [blogTitle, blogShortSummary, blogContent].some(
            (field)=> typeof field === "string" && field?.trim() === ""
        )
    ){
        throw new ApiError(400, "Fields are required");
    }
    console.log("Uploaded files", req.files);
    const blogCoverImageFile = req.files?.blog_cover_image;

    if(!blogCoverImageFile){
        throw new ApiError(400, "Blog Cover image is required");
    }
    const blogCoverImageLocalPath = blogCoverImageFile[0]?.path
    const blogCoverImage = await uploadOnCloudinary(blogCoverImageLocalPath)
    
    if(!blogCoverImage){
        throw new ApiError(200, "Blog Cover image is required");
    }

    const blogPost = await Blog.create({
        blog_auther : req.user.id,
        blog_title : blogTitle,
        blog_short_summary: blogShortSummary,
        blog_cover_image: blogCoverImage.url,
        blog_content:blogContent
    })

    return res
        .status(200)
        .json(new ApiResponse(200, blogPost, "Blog is Created Successfully"))
});

const updateBlogById = asyncHandler(async(req, res)=>{
    const blogId = req.params.id;

    const {blogTitle, blogShortSummary, blogContent } = req.body;
    
    if(
        [blogTitle, blogShortSummary, blogContent].some(
            (field)=> typeof field === "string" && field?.trim() === ""
        )
    ){
        throw new ApiError(400, "Fields are required");
    }

    const blogCoverImageFile = req.files?.blog_cover_image;

    if(!blogCoverImageFile){
        throw new ApiError(400, "Blog Cover image is required");
    }
    const blogCoverImageLocalPath = blogCoverImageFile[0]?.path
    const blogCoverImage = await uploadOnCloudinary(blogCoverImageLocalPath)
    
    if(!blogCoverImage){
        throw new ApiError(200, "Blog Cover image is required");
    }

    const updateBlogById = await Blog.findByIdAndUpdate(
        blogId,
        {
            blog_auther : req.user.id,
            blog_title : blogTitle,
            blog_short_summary: blogShortSummary,
            blog_cover_image: blogCoverImage.url,
            blog_content:blogContent
        },
        { new:true},
    );

    return res
        .status(200)
        .json(new ApiResponse(200, updateBlogById, "Blog is Updated Successfully"))
    
});

// DELETE REQUEST FOR DELETING BLOG BY ID
const  deleteBlogById = asyncHandler(async (req, res) => {
    const blog = req.params.id;
    const blogById = await Blog.findByIdAndDelete(blog);

    if (!blogById) {
        throw new ApiError("404", "Project not found");
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            blogById,
            "Blog delete successfully"
        )
    );

})

export { 
    createBlog, 
    getAllBlogs,
    getBlogById,
    updateBlogById,
    deleteBlogById
}
