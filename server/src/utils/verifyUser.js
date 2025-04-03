import { errorHandler } from "./error.js"
import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
    try {
        const token = req.cookies.access_token; 

        if (!token) return next(errorHandler(401, "Unauthorized: No token provided"));

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) return next(errorHandler(403, "Forbidden: Invalid token"));

            req.user = decoded; 
            next();
        });

    } catch (error) {
        next(errorHandler(500, "Internal Server Error"));
    }
};
