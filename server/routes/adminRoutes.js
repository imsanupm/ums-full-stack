import express from "express";
const adminRoutes = express.Router();
import { authMiddleware } from "../middleware/authMiddleware.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";
import { dashBoard } from "../controllers/admin/dashBoard.js";




adminRoutes.get("/adminDashboard",dashBoard);

export default adminRoutes