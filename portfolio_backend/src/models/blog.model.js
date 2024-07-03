import mongoose, {Schema} from "mongoose";

const blogSchema = new Schema(
    {
        blog_title: {
            type:String,
            required:true,
            unique:true
        },
        blog_short_summary:{
            type:String,
            required:true,  
        },
        blog_auther:{
            type:Schema.Types.ObjectId,
            ref:'User'
        },
        blog_cover_image:{
            type:String,
            required:true
        },
        blog_content:{
            type:String,
            required:true
        }
    }, {
        timestamps:true
    }
)

export const Blog = mongoose.model("Blog", blogSchema)