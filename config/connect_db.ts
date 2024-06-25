import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL_CONNECTION as string, { autoIndex: true })
        console.log('mongodb connecting...')
    } catch (error) {
        console.log('error: ', error);
    }
}