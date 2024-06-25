import express, { Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import 'dotenv/config';
import { connectDB } from './config/connect_db';
import authRoutes from './routes/author'


const app = express();
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use("/api", authRoutes)
app.get("/api/test", async (req: Request, res: Response) => {
    res.json({ message: "hello" })
});
connectDB()
const port = process.env.PORT || 8888
app.listen(port, () => {
    console.log(`Server running at ${port}`);
});