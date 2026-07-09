
import User from '../models/User.js';
import bycrypt from "bcryptjs";

export const sigUp = async (req,res)=>{

    try {

        const {name,email,password} = req.body;
        const userExist = await User.findOne({email})
        if(userExist){
            return res.status(400).json({message:"User already exist"})
        };

        const hashPassword = await bycrypt.hash(password,10);
        
        // Generate a random avatar using the user's name as a seed
        const randomProfileImage = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffdfbf,ffd5dc`;

        const user = await User.create({
            name,
            email,
            password: hashPassword,
            profileImage: randomProfileImage
        });

        return res.status(201).json({
            message:"User registered successfully",
            user
        })

    } catch (error) {
        console.log(`error from signup user controller=======${error}`);
        return res.status(500).json({message:error.message});
        
    }
}

