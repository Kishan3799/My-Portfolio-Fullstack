import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Contact } from "../models/contact.model.js";
import { sendMail } from "../middlewares/sendMail.middleware.js";

//POST REQUEST TO STORE A CONTACT IN THE DATABASE
const createContact = asyncHandler(async (req, res) => {

    //CREATE NEW CONTACT OBJECT FROM THE REQUEST BODY AND SAVE IT INTO THE DATABASE USING AN ASYNC/AWAIT PROMISE
    const {userName, userEmail, userMessage} = req.body;

    if(
        [userName, userEmail, userMessage].some(
            (fields) => typeof fields === "string" && fields?.trim() === ""
        )
    ){
        throw new ApiError(400, "Fields are required");
    }

    const messageTemplate = `Hey, I am ${userName}. My email is ${userEmail}. My message is ${userMessage}.`;

    await sendMail(messageTemplate);

    const contact = await Contact.create({
        name:userName,
        email:userEmail,
        message:userMessage
    })
    

    //RETURN A SUCCESSFUL API RESPONSE WITH THE NEWLY CREATED CONTACT OBJECT AND HTTP STATUS CODE 200 OK
    return res.
    status(200)
    .json(
        new ApiResponse(200, contact, "Contact successfully created. Email send successfully")
    );
});

const getAllContact = asyncHandler(async (req,res)=> {
    const contacts = await Contact.find({}).sort({createdAt:-1})

    return res
        .status(200)
        .json(
            new ApiResponse(200, contacts, "Fetch all projects successfully")
        )
})


export { 
    createContact,
    getAllContact
}