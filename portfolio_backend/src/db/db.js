import mongoose from 'mongoose'
import { DB_NAME } from '../constant.js'

const conectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\n MongoDb Connected ! DB host: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("MONGODB connection error: ", error);
        process.exit(1)
    }   
}

export default conectDB