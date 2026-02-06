import {Router} from "express";
import {PostController} from "./post.controller";
import {verifyToken} from "../middleware/verifyToken";

const router = Router();

const post = new PostController;

router.post(
    "/posts", 
    verifyToken,
    post.uploadPost
)

router.put(
    "/posts/:postId",
    verifyToken,
    post.updatePost
)

router.delete(
    "/posts/:postId", 
    verifyToken,
    post.deletePost
)

export default router;
