import User from "../models/User.js";

export const getCurrentUser = async (req, res) => {
    try {

        console.log('you are getting call===============');
        
        const user = await User.findById(req.user._id).select(
            "-password -refreshToken"
        );

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        console.error("Get Current User Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};