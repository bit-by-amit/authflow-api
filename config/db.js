import "dotenv/config.js"
import mongoose from "mongoose"
export const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("DB connected")
    } catch (error) {
        console.log("error" , error)
        return error;
    }
}