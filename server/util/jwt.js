import jwt from "jsonwebtoken";

// Removed 'default'
export function generateAccessToken(user) {
    return jwt.sign(
        {
            id: user._id,
            email: user.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "1m"
        }
    );
}

// Removed 'default'
export function generateRefreshToken(user) {
    return jwt.sign(
        {
            id: user._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: "7d"
        }
    );
}