import express from "express"
import connectDb from "./config/db"
import dotenv from "dotenv"
import cors from "cors"
import authRoutes from "./routes/authRoutes"
import feedbackRoutes from "./routes/feedbackRoutes"
import { setupSwagger } from './utils/swagger';

dotenv.config()

const port = process.env.PORT || 3000
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api/auth', authRoutes);
app.use('/api/',feedbackRoutes)
connectDb()
setupSwagger(app);



app.listen(port, ()=>{
    console.log("Server is running on port", port)
})