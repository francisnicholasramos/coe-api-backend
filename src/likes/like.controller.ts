import type {RequestHandler} from "express";
import {toggleLike, getLikesCount, getLikeStatus} from "./like.repository";
import {getPostById} from "../posts/post.repository";

export class LikeController {
    toggleLikeHandler: RequestHandler = async (req, res, next) => {
        try {
            const userId = req.user.id;
            
            if (!userId) return res.sendStatus(401);

            const postId = req.params.postId;

            if (!postId || typeof postId !== 'string') {
                return res.sendStatus(404);
            }
                
            const post = await getPostById(postId);

            if (!post) {
                return res.status(404).json({
                    message: "Post not found."
                });
            }

            await toggleLike(postId, userId);

            res.sendStatus(200)
        } catch (err)  {
            next(err)
        }
    }

    getLikesCountHandler: RequestHandler = async (req, res) => {
        const postId = req.params.postId as string;
        const count = await getLikesCount(postId);

        res.json({ 
            likesCount: count 
        });
    }

    getLikeStatusHandler: RequestHandler = async (req, res) => {
        const userId = req.user?.id;
        const postId = req.params.postId as string;

        if (!userId) return res.sendStatus(401);

        const liked = await getLikeStatus(postId, userId);

        res.json({ liked });
    }
}
