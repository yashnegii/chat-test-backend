import { Router } from "express";
// const authController= require ("../controllers/authController")
import { loginPostHandler,signupPostHandler } from "../controllers/authController.js";

const router = Router();

router.route("/login").post(loginPostHandler);
router.route("/signup").post(signupPostHandler);

export default router;
