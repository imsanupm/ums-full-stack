import User from "../models/User.js";

export const updateProfile = async (req, res) => {
    try {
        const { profileImage } = req.body;
        
        // We only allow updating the profile image right now.
        // If profileImage is not provided, we can return a bad request.
        if (!profileImage) {
            return res.status(400).json({
                message: "Profile image data is required",
            });
        }

        const user = await User.findById(req.user._id).select("-password -refreshToken");

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        user.profileImage = profileImage;
        await user.save();

        return res.status(200).json({
            success: true,
            user,
        });

    } catch (error) {
        console.error("Update Profile Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
