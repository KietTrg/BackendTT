import { Request, Response } from "express";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import Author from '../models/author'


export const register = async (req: Request, res: Response) => {
    const { password, fullName, email, gender, dateOfBirth } = req.body
    const validGenders = ['male', 'female'];
    if (!validGenders.includes(gender)) {
        return res.status(400).json({ message: 'Invalid gender value' });
    }
    try {
        let user = await Author.findOne({ email })
        if (user) {
            return res.status(400).json({ message: 'User already exists' })
        }
        user = await Author.create({
            fullName,
            email,
            gender,
            dateOfBirth,
            password: await bcrypt.hash(password, 10)
        })
        const accessToken = await jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET_KEY as string,
            { expiresIn: '7d' }
        )
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        });
        return res.status(200).json({ accessToken, message: 'Register success' })
    } catch (error) {
        console.log('error: ', error);
        res.status(500).send({ message: 'Something went wrong' })
    }

}
export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body
    try {
        const user = await Author.findOne({ email }).select("+password")
        if (!user) {
            return res.status(400).json({ message: 'Invalid Credentials' })
        }
        const checkPass = await bcrypt.compare(password, user.password)
        if (!checkPass) {
            return res.status(400).json({ message: 'Password wrong' })
        }
        const accessToken = await jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET_KEY as string,
            { expiresIn: '7d' }
        )
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        });
        res.status(200).json({ userId: user._id, accessToken, message: 'Login success' })
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({ message: 'Something went wrong' })
    }
}