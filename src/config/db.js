import mongoose from "mongoose";

//Open connection to atlas
//Read uri value out of the .env
export async function connectDB() {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB Connected Successfully");
    } catch (err){
        console.error("MongoDB connection error:", err.message);
        process.exit(1);
    }
    }