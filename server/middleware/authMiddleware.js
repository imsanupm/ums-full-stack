import jwt from "jsonwebtoken";
import User from "../models/User.js";


export const authMiddleware = async (req, res, next) => {
    try {
        console.log('auth middleware running =================');
        
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "No token provided",
            });
        }

        // FIX: Extract the actual token string from the "Bearer <token>" header
        const token = authHeader.split(" ")[1]; 

        // Now 'token' is safely defined!
        const decoded = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET
        );
        
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }
        
        req.user = user;
        next(); // Successfully passes control to getCurrentUser
    } catch (error) {
        // Log the error locally so you can see exactly what went wrong during testing
        console.error("Auth Middleware Error:", error.message); 
        
        return res.status(401).json({
            message: "Invalid or expired access token",
        });
    }
};