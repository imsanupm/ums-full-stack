import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { generateAccessToken } from "../util/jwt.js";

export const refreshToken = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;
        if (!token) {
            return res.status(401).json({ message: "No refresh token provided" });
        }

        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decoded.id);

        if (!user || user.refreshToken !== token) {
            return res.status(403).json({ message: "Invalid refresh token" });
        }

        const newAccessToken = generateAccessToken(user);
        
        return res.status(200).json({
            accessToken: newAccessToken
        });
    } catch (error) {
        console.error("Refresh Token Error:", error.message);
        return res.status(403).json({ message: "Invalid or expired refresh token" });
    }
};
