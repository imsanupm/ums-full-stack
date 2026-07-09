import express from "express";
import { sigUp } from "../controllers/signupController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { signIn } from "../controllers/signinController.js";
import {getCurrentUser} from "../controllers/getCurrentUser.js"
import { logout } from "../controllers/logout.js";
import { refreshToken } from "../controllers/refreshController.js";
import { updateProfile } from "../controllers/updateProfileController.js";

const router = express.Router()

 router.get('/',authMiddleware,getCurrentUser)
 router.get("/logout",authMiddleware,logout)
 router.get("/refresh",refreshToken)
 router.post('/register',sigUp)
 router.post('/login',signIn)
 router.put('/profile', authMiddleware, updateProfile)


export default router;