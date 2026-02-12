import {Router} from "express";
import {PostController} from "./post.controller";
import {verifyToken} from "../middleware/verifyToken";

const router = Router();

const post = new PostController;

router.get(
    "/", 
    post.getPublicPostHandler
)

router.get(
    "/",
    verifyToken,
    post.getUserPostsHandler
)

router.post(
    "/posts", 
    verifyToken,
    post.uploadPostHandler
)

router.put(
    "/posts/:postId",
    verifyToken,
    post.updatePostHandler
)

router.delete(
    "/posts/:postId", 
    verifyToken,
    post.deletePostHandler
)

export default router;
