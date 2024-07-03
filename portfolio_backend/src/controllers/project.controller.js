import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Project } from "../models/project.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

//POST REQUEST FOR CREATE PROJECT -- LOGIN IS REQUIRED --
const createProject = asyncHandler(async (req, res) => {
    const { title, description, techStack, tag, live_link, github_link } =
        req.body;

    if (
        [title, description, techStack, tag, github_link].some(
            (field) => typeof field === "string" && field?.trim() === ""
        )
    ) {
        throw new ApiError(400, "Fields are required");
    }

    const projectImageFiles = req.files?.project_image;
    const projectVideoFile = req.files?.project_video;

    if (!projectImageFiles || projectImageFiles.length === 0) {
        throw new ApiError(400, "Project image is required");
    }

    const projectImages = await Promise.all(
        projectImageFiles.map(async (file) => {
            const projectImage = await uploadOnCloudinary(file.path);
            if (!projectImage) {
                throw new ApiError(400, "Project image is required");
            }

            return projectImage.url;
        })
    );

    let projectVideoUrl = null;
    if (projectVideoFile && projectVideoFile.length > 0) {
        const projectVideoLocalPath = projectVideoFile[0]?.path;
        const projectVideo = await uploadOnCloudinary(projectVideoLocalPath);
        if (!projectVideo) {
            throw new ApiError(400, "Failed to upload project video");
        }

        projectVideoUrl = projectVideo.url;
    }

    const project = await Project.create({
        user: req.user.id,
        title,
        description,
        techStack,
        tag,
        live_link,
        github_link,
        project_image: projectImages,
        project_video: projectVideoUrl,
    });

    return res
        .status(200)
        .json(new ApiResponse(200, project, "Project is created successfully"));
});

//PUT REQUEST FOR UPDATE PROUJECT USING PROJECT ID
const updateProject = asyncHandler(async (req, res) => {
    const projectId = req.params.id;

    const { title, description, techStack, tag, live_link, github_link } =
        req.body;

    if (
        [title, description, techStack, tag, github_link].some(
            (field) => typeof field === "string" && field?.trim() === ""
        )
    ) {
        throw new ApiError(400, "Fields are required");
    }

    const projectImageFiles = req.files?.project_image;
    const projectVideoFile = req.files?.project_video;

    if (!projectImageFiles || projectImageFiles.length === 0) {
        throw new ApiError(400, "Project image is required");
    }

    const projectImages = await Promise.all(
        projectImageFiles.map(async (file) => {
            const projectImage = await uploadOnCloudinary(file.path);
            if (!projectImage) {
                throw new ApiError(400, "Project image is required");
            }

            return projectImage.url;
        })
    );

    let projectVideoUrl = null;
    if (projectVideoFile && projectVideoFile.length > 0) {
        const projectVideoLocalPath = projectVideoFile[0]?.path;
        const projectVideo = await uploadOnCloudinary(projectVideoLocalPath);
        if (!projectVideo) {
            throw new ApiError(400, "Failed to upload project video");
        }

        projectVideoUrl = projectVideo.url;
    }

    const projectById = await Project.findByIdAndUpdate(
        projectId,
        {
            user: req.user.id,
            title,
            description,
            techStack,
            tag,
            live_link,
            github_link,
            project_image: projectImages,
            project_video: projectVideoUrl,
        },
        { new: true }
    );

    if (!projectById) {
        throw new ApiError("404", "Project not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, projectById, "Project update successfully"));
});

//GET REQUEST FOR GETTING ALL PROJECTS
const getAllProjects = asyncHandler(async (req, res) => {
    const projects = await Project.find();
    return res
        .status(200)
        .json(
            new ApiResponse(200, projects, "Fetch all projects successfully")
        );
});

//GET REQUEST FOR GETTING SINGLE PROJECT DETAIL USING PROJECT ID
const getProjectById = asyncHandler(async (req, res) => {
    const projectId = req.params.id;
    const projectById = await Project.findById(projectId);

    if (!projectById) {
        throw new ApiError("404", "Project not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                projectById,
                "Project detail fetched successfully"
            )
        );
});




export { createProject, getAllProjects, getProjectById, updateProject };
