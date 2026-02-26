import {Router} from "express";
import {PostController} from "./post.controller";
import {verifyToken} from "../middleware/verifyToken";
import {writeLimiter} from "../middleware/rateLimiter";

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
    post.getPublicPostById
)

// private blogs (scope to user)
router.get(
    "/me",
    verifyToken,
    post.getUserPostsHandler
)

// get specific private blog 
router.get(
    "/posts/:postId",
    verifyToken,
    post.getPostByIdHandler
)

router.post(
    "/posts", 
    writeLimiter,
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
