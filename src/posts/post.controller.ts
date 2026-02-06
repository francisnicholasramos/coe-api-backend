import type {RequestHandler} from "express";
import {createPost} from "../database/blog.repository";

export class PostController {
    // upload post
    uploadPost: RequestHandler = async (req, res, next) => {
        try {
            const userId = req.user?.id;

            if (!userId) return res.sendStatus(401);

            const {title, content, published} = req.body;

            const data = await createPost(title, content, published, userId);

            res.json({
                data
            })
        } catch (err) {
            next(err)
        }
    }
}
