import {Router} from "express";
import {UserContoller} from "./user.controller";
import {verifyToken} from "../middleware/verifyToken";

const router = Router();

const user = new UserContoller;

router.get("/user/me",
    verifyToken,
    user.getUser
)

router.put(
    "/user/change-password", 
    verifyToken,
    user.changePassword
);

export default router;
