import type {RequestHandler} from "express";
import {CreatePostSchema, UpdatePostSchema} from "./post.schema";

import {createPost, 
        getPublicPosts,
        getAllUserPosts,
        getPostById, 
        updatePostById,
        deletePostById
} from "./post.repository";

export class PostController {
    getPublicPostHandler: RequestHandler = async (req, res, next) => {
        try {
            const publicBlogs = await getPublicPosts();

            res.json({ 
                publicBlogs 
            })
        } catch (err) {
            next(err)
        }
    }

    // user's all blogs
    getUserPostsHandler: RequestHandler = async (req, res, next) => {
        try {
            const userId = req.user?.id;

            if (!userId) return res.sendStatus(401);

            const blogs = await getAllUserPosts(userId);

            res.json({
                blogs
            })
        } catch (err) {
            next(err)
        }
    }

    // upload post
    uploadPostHandler: RequestHandler = async (req, res, next) => {
        try {
            const userId = req.user?.id;

            if (!userId) return res.sendStatus(401);

            const validated = CreatePostSchema.parse(req.body);
            const {title, content, published} = validated;

            const data = await createPost(title, content, published, userId);

            res.json({
                data
            })
        } catch (err) {
            next(err)
        }
    }

    updatePostHandler: RequestHandler = async (req, res, next) => {
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

            const validated = UpdatePostSchema.parse(req.body);

            await updatePostById(postId, validated)
            
            res.json({
                message: 'Post successfully updated.'
            })
        } catch (err) {
            next(err)
        }
    }

    // delete post
    deletePostHandler: RequestHandler = async (req, res, next) => {
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

            res.json({
                status: "success",
                message: "Delete Blog Successfully."
            });
        } catch (err) {
            next(err)
        }
    }
}
