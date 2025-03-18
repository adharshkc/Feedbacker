import mongoose from "mongoose";

import dotenv from "dotenv"

dotenv.config()

const dbUrl = process.env.MONGODB_URL;
const connectDb = async () => {
    try {
      if (dbUrl) {
        const connect = await mongoose.connect(dbUrl);
        
        console.log("connected to database");
      }
    } catch (error: any) {
      console.log(error.message);
      process.exit(1);
    }
  };
  
  export default connectDb;