import Router from "express";
import {signup, login, refresh, logout} from "./auth.controller";
import {authLimiter} from "../middleware/rateLimiter";

const router = Router();

router.route("/signup")
      .post(authLimiter, signup)

router.route("/login")
      .post(authLimiter, login)

router.route("/refresh-token")
      .post(refresh)

router.route("/logout")
      .post(logout)

export default router;
