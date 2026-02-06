import {Router} from "express";
import {PostController} from "./post.controller";
import {verifyToken} from "../middleware/verifyToken";

const router = Router();

const post = new PostController;

router.post("/posts", 
            verifyToken,
            post.uploadPost)

export default router;
