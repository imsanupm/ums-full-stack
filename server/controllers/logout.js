import User from "../models/User.js";



export const logout = async (req,res) => {
    try {

        console.log('lgout controller getting the call===============');
        
        const token = req.cookies.refreshToken;

        if(token){
            const user = await User.findOne({
                refreshToken: token,
            });
            if(user){
                user.refreshToken = null;
                await user.save();
            }
        };

        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        return res.status(200).json({
            message:"Logged out successfuly"
        })

        
    } catch (error) {
         return res.status(500).json({
            message: error.message,
        });
    }
}