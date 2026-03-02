import Router from "express";
import {signup, login, refresh, logout} from "./auth.controller";
import {authLogInLimiter, authSignInLimiter} from "../middleware/rateLimiter";

const router = Router();

router.route("/signup")
      .post(authSignInLimiter, signup)

router.route("/login")
      .post(authLogInLimiter, login)

router.route("/refresh-token")
      .post(refresh)

router.route("/logout")
      .post(logout)

export default router;
