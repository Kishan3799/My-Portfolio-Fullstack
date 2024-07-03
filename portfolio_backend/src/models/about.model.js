import mongoose, {Schema} from "mongoose";

const aboutSchema = new Schema(
    {
        user:{
            type:Schema.Types.ObjectId,
            ref:'User'
        },
        about_description:{
            type:String,
            required:true
        },
        profileImage:{
            type:String,
            required:true,
        },
    },
    {
        timestamps:true
    }
)

export const About = mongoose.model("About", aboutSchema)