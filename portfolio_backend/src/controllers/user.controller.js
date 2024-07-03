import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.models.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import jwt, { decode } from "jsonwebtoken"
//Generating Access and Refressh token
const generatingAccessToken = async(userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        // const refreshToken = admin.generateRefreshToken()
        await user.save({validateBeforeSave:false})
        return {accessToken}

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating access token")
    }
}

//Admin Login
const loginAdmin = asyncHandler( async (req, res) => {
    //admin name , email and password already exits in mongodb
    //createing a method to logged in 
    //taking email and password form FrontEnd
    const {email, password} = req.body;

    if(!email){
        throw new ApiError(400, "email is required");
    }

    //find user in db
    // const user = await User.findOne({
    //     $or :[{email}]
    // })
    const user = await User.findOne({ email });

    if(!user) {
        throw new ApiError(404, "User does not Exists")
    }

    const accessToken = jwt.sign(
        {
            _id: user._id,
            email: user.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: process.env.ACCESS_TOKEN_EXPIRY}
    )

    // const loggedInUser = await User.findById(user._id).select("-password");

    const options = {
        // expires: new Date(Date.now() + 600000),
        httpOnly:true,
        secure:true,
        sameSite: 'Strict'
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user, accessToken
                },
                "Admin logged in Successfully"
            )
        )
})

//Admin Loggout
const loggout = asyncHandler( async (req, res) => {

    const options = {
        // expires: new Date(0),
        httpOnly:true,
        secure:true,
        sameSite:'Strict'
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .json(
            new ApiResponse(
                200,
                {},
                "Loggout Successfully"
            )
        )

})

//CheckAuthentication
const checkAuth = asyncHandler( async (req, res) => {
    res.status(200).json(new ApiResponse(200, { user: req.user }, 'Protected route accessed'));
});

export {
    loginAdmin,
    loggout,
    checkAuth
}