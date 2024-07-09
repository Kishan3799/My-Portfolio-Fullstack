import {v2 as cloudinary} from 'cloudinary';
import fs from "fs"

cloudinary.config({ 
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_CLOUD_APIKEY, 
  api_secret:process.env.CLOUDINARY_CLOUD_APISECRET 
});

//creating an method to upload image on cloudinary
const uploadOnCloudinary = async (localFilePath) => {
    try {
       if(!localFilePath) return null

       const response = await cloudinary.uploader.upload(localFilePath, {
        resource_type: "auto"
       })
       console.log("File is Uploaded on cloudinary", response);
       fs.unlinkSync(localFilePath);
       return response
        
    } catch (error) {
        fs.unlinkSync(localFilePath);
        return null;
    }
}

// creating a method to delete image on cloudinary
const deleteImageFromCloudinary = async (public_id) => {
  try {
    const response = await cloudinary.uploader.destroy(public_id,{
      resource_type: "image"
    })
    console.log("File is deleted on cloudinary", response)
    return response
  } catch (error) {
    console.log(error)
    return null
  }
}


export {uploadOnCloudinary,deleteImageFromCloudinary}