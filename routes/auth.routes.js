import express from "express"
import { authMiddleware, login, profileDetails, signup } from "../controllers/auth.controller.js";


const router = express.Router();

// signup route.
router.post("/signup" , signup)

// login signup.
router.post("/login" , login)

// get Profile..
router.get("/profile" , authMiddleware, profileDetails)


export default router;