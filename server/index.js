import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config({
    path:'./.env'
});

import cookieParser from "cookie-parser";
app.use(cookieParser());


import cors from 'cors';
app.use(cors({
    origin: process.env.FRONTEND_URL, 
    credentials: true 
}));


// Database connection
import connectDB from './src/db/index.js';
connectDB();
app.use(express.json())

// PORT

import serverless from 'serverless-http';
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Server running at:`, PORT);
    });
}

// import routes

import authRouter from './src/routes/auth.route.js';
app.use("/api/v1/auth", authRouter)


import todoRouter from './src/routes/todo.route.js';
app.use("/api/v1/todo", todoRouter)



//error handling
app.use((err, req, res, next) =>
    {
        const statusCode = err.statusCode ||500
        const message= err.message || "Internal server error"
    
        return res.status(statusCode).json({
            success:false,
            statusCode,
            message,
        })
        
      
    })

    
    export default serverless(app);