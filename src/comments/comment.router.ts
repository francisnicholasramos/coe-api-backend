import Router from "express";
import {CommentController} from "./comment.controller";
import {verifyToken} from "../middleware/verifyToken";
import {commentLimiter} from "../middleware/rateLimiter";

const router = Router();

const comment = new CommentController;

router.post(
    "/comments", 
    commentLimiter,
    verifyToken,
    comment.uploadCommentHandler
)

router.put(
    "/comments/:commentId",
    verifyToken,
    comment.updateCommentHandler
)

router.delete(
    "/comments/:commentId",
    verifyToken,
    comment.deleteCommentHandler
)

export default router;
