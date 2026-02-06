import Router from "express";
import {postSignUp, login} from "./auth.controller";

const router = Router();

router.route("/signup")
      .post(postSignUp)

router.route("/login")
      .post(login)

export default router;
