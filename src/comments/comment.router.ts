import Router from "express";
import {CommentController} from "./comment.controller";

const router = Router();

const comment = new CommentController;

router.post("/comments", comment.uploadCommentHandler)

export default router;
