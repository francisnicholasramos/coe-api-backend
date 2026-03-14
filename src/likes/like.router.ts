import {Router} from "express";
import {LikeController} from "./like.controller";
import {verifyToken} from "../middleware/verifyToken";

const router = Router();

const like = new LikeController;

router.get(
    "/posts/:postId/likes/count",
    like.getLikesCountHandler
)

router.get(
    "/posts/:postId/like/status",
    verifyToken,
    like.getLikeStatusHandler
)

router.post(
    "/posts/:postId/like",
    verifyToken,
    like.toggleLikeHandler
)


export default router;
