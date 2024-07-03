import mongoose, {Schema} from "mongoose";

const contactSchema = new Schema(
    {
        name:{
            type:String,
            require:true,
        },
        email:{
            type:String,
            require:true,
        },
        message:{
            type:String,
            require:true,
        }
    },
    {
        timestamps:true
    }
    
)

export const Contact = mongoose.model("Contact", contactSchema);
