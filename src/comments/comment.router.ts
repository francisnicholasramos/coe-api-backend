import Router from "express";
import {CommentController} from "./comment.controller";
import {verifyToken} from "../middleware/verifyToken";
import {softAuth} from "../middleware/softAuth";

const router = Router();

const comment = new CommentController;

router.post(
    "/comments", 
    softAuth,
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
