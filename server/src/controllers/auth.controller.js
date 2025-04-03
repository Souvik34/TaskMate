import { User } from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcrypt from "bcryptjs";


export const signup= async(req, res, next)=>{
    try {
        const {
            username,
            email,
            password
        }= req.body;

        // Check if user already exists
        const isValidator =await User.findOne({email});
        if(isValidator)
        {
            return next(errorHandler(400, "User already exists"))
        }

      

        // Create new user

        const newUser= await User.create({
            username,
            email,
            password

        })
        // Send response
         
        res.status(201).json({
            success: true,
            message: "User created successfully !",
            data: {
                username: newUser.username,
                email: newUser.email,
                timestamp: newUser.createdAt,
                id: newUser._id
            }

        })

    } catch (error) {
        next(error)
    }
}


export const signin = async(req, res, next)=>{
    const { email, password} = req.body;

    try {
        const validUser = await User.findOne({email});

        if(!validUser)
        {
            return next(errorHandler(404, "User not found"))
        }
        // Check password

        const validPassword = await validUser.comparePassword(password);

        if(!validPassword)
        {
            return next(errorHandler(400, "Invalid credentials"))
        }

        // Generate tokens
        const accessToken = validUser.generateAccessToken();
        const refreshToken = validUser.generateRefreshToken();

        // Store refresh token in HttpOnly cookie
        res.cookie("refresh_token", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",

        });

        // Send response with tokens
        res.status(200).json({
            success: true,
            message: "Signin successful!",
            accessToken,
            user: {
                id: validUser._id,
                username: validUser.username,
                email: validUser.email,
            },
        });
      
    } catch (error) {
        next(error)
        
    }

}