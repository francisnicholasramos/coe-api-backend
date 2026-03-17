import type {RequestHandler} from "express";
import {toggleLike, getLikesCount, getAllLikedPosts} from "./like.repository";
import {getPostById} from "../posts/post.repository";

export class LikeController {
    getAllLikedPostsHandler: RequestHandler = async (req, res, next) => {
        try {
            const userId = req.user.id;

            if (!userId) return res.sendStatus(401);

            const likedPosts = await getAllLikedPosts(userId);

            return res.status(200).json({
                likedPosts
            })
        } catch (err) {
            next(err)
        }
    }

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
}
