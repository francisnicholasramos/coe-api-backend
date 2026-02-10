import type {RequestHandler} from "express";
import {createPost, 
        getPostById, 
        updatePostById,
        deletePostById
} from "./post.repository";

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

    updatePost: RequestHandler = async (req, res, next) => {
        try {
            const userId = req.user?.id;

            if (!userId) {
                return res.status(401).json({message: "Unauthorized"});
            }

            const postId = req.params.postId as string;

            const post = await getPostById(postId)

            if (!post) {
                return res.status(404).json({message: "Blog not found."});
            }

            if (post.userId !== userId) {
                return res.status(401).json({message: "Unauthorized"});
            }

            const {title, content, published} = req.body;

            await updatePostById(postId, title, content, published)
            
            res.json({
                message: 'Post successfully updated.'
            })
        } catch (err) {
            next(err)
        }
    }

    // delete post
    deletePost: RequestHandler = async (req, res, next) => {
        try {
            const userId = req.user?.id;

            // Unauthorized 401
            if (!userId) {
                return res.status(401).json({message: "Unauthorized"});
            }

            // Get id from request
            const postId = req.params.postId as string;

            const post = await getPostById(postId)

            if (!post) {
                return res.status(404).json({message: "Blog not found."});
            }

            // ownership check
            if (post.userId !== userId) {
                return res.status(401).json({message: "Unauthorized"});
            }

            await deletePostById(postId)

            // 204 = No Content 
            res.json({
                status: "success",
                message: "Delete Blog Successfully."
            });
        } catch (err) {
            next(err)
        }
    }
}
