import mongoose from "mongoose";
export type AuthorType = {
    _id: string;
    email: string;
    password: string;
    fullName: string;
    gender: string;
    dateOfBirth: String
}
const authorSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            require: true,
            unique: true
        },
        password: {
            type: String,
            require: true,
            select: false,
        },
        fullName: {
            type: String,
            require: true
        },

        gender: {
            type: String,
            enum: ['male', 'female']
        },
        dateOfBirth: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
)
const Author = mongoose.model<AuthorType>('author', authorSchema);

export default Author;