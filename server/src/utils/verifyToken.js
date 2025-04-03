import jwt from 'jsonwebtoken';


    export const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }

    try {
        const verified = jwt.verify(token.replace("Bearer ", ""), process.env.ACCESS_TOKEN_SECRET);
        req.user = verified; // Attach user data to request
        next(); // Proceed to the next middleware or route
    } catch (err) {
        res.status(403).json({ message: 'Invalid or expired token.' });
    }
};


