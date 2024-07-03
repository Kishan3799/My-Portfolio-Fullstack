import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"

const userSchema = new Schema(
    {
        name:String,
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true
        },
        password: {
            type:String,
            required:true,
            select:false
        },
        isAdmin: {
            type:Boolean,
            default:true
        }
    },
    {
        timestamps:true
    }
)

userSchema.methods.isPasswordCorrect = async function(password){
    return (password === this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email:this.email,
            name:this.name,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.ACCESS_TOKEN_EXPIRY
        }
    )
}
export const User = mongoose.model("User", userSchema)