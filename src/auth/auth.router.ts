import Router from "express";
import {signup, login, logout} from "./auth.controller";

const router = Router();

router.route("/signup")
      .post(signup)

router.route("/login")
      .post(login)

router.route("/logout")
      .post(logout)

export default router;
