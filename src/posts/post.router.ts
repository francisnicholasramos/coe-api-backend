import {Router} from "express";
import {PostController} from "./post.controller";
import {verifyToken} from "../middleware/verifyToken";

const router = Router();

const post = new PostController;

// public blogs
router.get(
    "/", 
    post.getPublicPostHandler
)

// get specific blog
router.get(
    "/@:username/:postId",
    post.getPostByIdHandler
)

// private blogs (scope to user)
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
