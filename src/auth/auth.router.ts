import Router from "express";
import {signup, login, refresh, logout} from "./auth.controller";

const router = Router();

router.route("/signup")
      .post(signup)

router.route("/login")
      .post(login)

router.route("/refresh-token")
      .post(refresh)

router.route("/logout")
      .post(logout)

export default router;
