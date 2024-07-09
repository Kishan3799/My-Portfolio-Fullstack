import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { About } from "../models/about.model.js"
import { deleteImageFromCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js"

//creating about Detail with image and Description
const createAboutDetail = asyncHandler(async (req,res) => {

    const {aboutDescription} = req.body;

    if(!aboutDescription){
        throw new ApiError(400, "This Field are required");
    }

    const profileImageLocalPath = req.files?.profileImage[0]?.path;

    if(!profileImageLocalPath){
        throw new ApiError(400, "Profile image is required");
    }

    const profileImage = await uploadOnCloudinary(profileImageLocalPath);

    if(!profileImage) {
        throw new ApiError(400, "Profile image is required");
    }

    const about = await About.create({
        about_description:aboutDescription,
        profileImage: profileImage.url,
        user: req.user.id
    })

    return res.
        status(200)
        .json(
            new ApiResponse(200, about, "Create About Section Successfully")
        )
})

//update profile Image 
const updateProfileImage = asyncHandler(async (req, res) => {
    const profileImageLocalPath = req.file?.path

    console.log(profileImageLocalPath)
    
    if(!profileImageLocalPath) {
        throw new ApiError(400, "Profile image is Missing");
    }

    const profileImage = await uploadOnCloudinary(profileImageLocalPath)

    if(!profileImage.url) {
        throw new ApiError(400, "Error while uploading on profile image");
    }

    const about = await About.findByIdAndUpdate(
        req.params.id,
        {
            $set:{
                profileImage: profileImage.url
            }
        },
        {new:true}
    )

    return res  
        .status(200)
        .json(
            new ApiResponse(200, about, "Profile Image is updated Successfully")
        )
})


//update description detail
const editDescription = asyncHandler(async (req, res) => {
    const { aboutDescription } = req.body
    console.log(aboutDescription );
    if(!aboutDescription){
        throw new ApiError(400, "This Field are required");
    }



    const about = await About.findByIdAndUpdate(
        req.params.id,
        {
            $set: {
                about_description: aboutDescription
            }
        },
        {new: true}
        
    )

    return res
        .status(200)
        .json(new ApiResponse(200, about, "About description update successfully"))
});

//geting about detail
const getaboutDetail = asyncHandler(async (req, res) => {
    const about = await About.findOne();
    return res
        .status(200)
        .json(new ApiResponse(200, about, "Current user fetched successfully"))
})

//Deleting About me 
const deleteAboutMe = asyncHandler(async (req, res)=> {
    const id = req.params.id
    const aboutById = await About.findById(id)

    if(!aboutById) {
        throw new ApiError("404", "About detail not found");
    }

    const publid_id = aboutById.profileImage.split('/').pop().split('.')[0];

    await deleteImageFromCloudinary(publid_id)

    await About.findByIdAndDelete(id)

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            aboutById,
            "About detail delete successfully"
        )
    );
})


export {
    createAboutDetail,
    editDescription,
    updateProfileImage,
    getaboutDetail,
    deleteAboutMe
}