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

        // Hash password
        const hashedPassword = await bcrypt.hash(password,10);

        // Create new user

        const newUser= await User.create({
            username,
            email,
            password : hashedPassword

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


const signin = async(req, res, next)=>{
    const { email, password} = req.body;

    try {
        const validUser = await User.findOne({email});

        if(!validuser)
        {
            return next(errorHandler(404, "User not found"))
        }
        // Check password

        const validPassword = await bcryptjs.compare(password, validUser.password);

        if(!validPassword)
        {
            return next(errorHandler(400, "Invalid credentials"))
        }

      
    } catch (error) {
        next(error)
        
    }

}