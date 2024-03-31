import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";

const router = new Router()

// Register
router.post("/register", register)

// Login
router.post("/login", login)

export default router