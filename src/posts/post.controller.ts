import type {RequestHandler} from "express";
import {CreatePostSchema, UpdatePostSchema} from "./post.schema";
import {handleDeleteUponEdit, handleDeleteImage} from "../uploads/upload.controller";

import {createPost, 
        getPublicPosts,
        getAllUserPosts,
        getPostById, 
        updatePostById,
        deletePostById,
        searchPublicPosts,
        searchUserPosts
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

    getUserPostByIdHandler: RequestHandler = async (req, res, next) => {
        try {
            const postId = req.params.postId as string;
            
            if (!postId) return res.status(404).json({message: "Blog not found."})

            const post = await getPostById(postId)

            if (!post) {
                return res.status(404).json({message: "Post not found."})
            }

            res.json({
                post
            })
        } catch (err) {
            next(err)
        }
    }

    getPublicPostById: RequestHandler = async (req, res, next) => {
        try {
            const postId = req.params.postId as string
            const username = req.params.username as string

            if (!postId) return res.status(404).json({message: "Blog not found."})

            const post = await getPostById(postId);

            if (!post?.published) {
                return res.sendStatus(403);
            }

            if (post?.user.username !== username) {
                return res.status(404).json({message: "Post not found for this user."})
            }

            res.json({
                post
            })
        } catch (err) {
            next(err)
        }
    }

    getPostByIdHandler: RequestHandler = async (req, res, next) => {
        try {
            const userId = req.user?.id

            if (!userId) return res.sendStatus(401)

            const postId = req.params.postId as string

            if (!postId) return res.status(404).json({message: "Blog not found."})

            const post = await getPostById(postId);

            if (!post) {
                return res.status(404).json({message: "Post not found."})
            }

            if (post.user.id !== userId) {
                return res.status(404).json({message: "Post not found for this user."})
            }

            res.json({
                post
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

            const { sortBy = "createdAt", order = "desc" } = req.query as {
                sortBy?: "createdAt";
                order?: "asc" | "desc";
            };

            const validSortFields = ["createdAt", "title"];
            const validOrders = ["asc", "desc"];

            if (!validSortFields.includes(sortBy) || !validOrders.includes(order)) {
                return res.status(400).json({ message: "Invalid sort parameters." });
            }

            const blogs = await getAllUserPosts(userId, { [sortBy]: order });

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
                return res.sendStatus(401)
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

            // delete removed images
            await handleDeleteUponEdit(post.content, validated.content);

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
            if (!userId) return res.sendStatus(401)

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

            // delete all images in the current post
            await handleDeleteImage(post.content);

            await deletePostById(postId)

            res.json({
                status: "success",
                message: "Delete Blog Successfully."
            });
        } catch (err) {
            next(err)
        }
    }

    searchPublicPostsHandler: RequestHandler = async (req, res, next) => {
        try {
            const { q } = req.query as {q?: string};

            if (!q || q.trim().length === 0) {
                return res.status(400).json({
                    message: "You must input something."
                })
            }

            const results = await searchPublicPosts(q);

            res.json({results});
        } catch (err) {
            next(err)
        }
    }

    searchUserPostsHandler: RequestHandler = async (req, res, next) => {
        try {
            const userId = req.user?.id;

            if (!userId) return res.sendStatus(401);

            const { q } = req.query as {q?: string};

            if (!q || q.trim().length === 0) {
                return res.status(400).json({
                    message: "You must input something."
                })
            }

            const results = await searchUserPosts(userId, q);

            res.json({results});
        } catch (err) {
            next(err)
        }
    }

}
