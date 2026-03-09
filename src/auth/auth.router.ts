import Router from "express";
import {signup, login, refresh, logout} from "./auth.controller";
import {authLogInLimiter, authSignInLimiter} from "../middleware/rateLimiter";
import {verifyRefreshToken} from "../middleware/verifyRefreshToken";

const router = Router();

router.route("/signup")
      .post(signup)

router.route("/login")
      .post(login)

router.route("/refresh-token")
      .post(verifyRefreshToken, refresh)

router.route("/logout")
      .post(logout)

export default router;
