import  mongoose, { Schema } from "mongoose";

const projectSchema = new Schema(
    {
        user:{
            type:Schema.Types.ObjectId,
            ref:'User'
        },
        title:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        techStack:{
            type:[String],
            required:true
        },
        tag:{
            type:String,
            required:true
        },
        live_link:{
          type:String
        },
        github_link:{
            type:String,
            required:true
        },
        project_image:{
            type:[String],
            required:true
        },
        project_video:{
            type:String
        }
    },
    {
        timestamps:true
    }
)

export const Project = mongoose.model("Project", projectSchema)