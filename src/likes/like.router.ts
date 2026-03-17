import {Router} from "express";
import {LikeController} from "./like.controller";
import {verifyToken} from "../middleware/verifyToken";
import {likeLimiter} from "../middleware/rateLimiter";

const router = Router();

const like = new LikeController;

router.get(
    "/likes/:postId",
    like.getLikesCountHandler
)

router.post(
    "/likes/:postId",
    likeLimiter,
    verifyToken,
    like.toggleLikeHandler
)


export default router;
