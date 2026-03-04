import {RequestHandler} from "express";
import {
    createComment, 
    updateComment, 
    getCommentById,
    deleteCommentById
} from "./comment.repository";
import {getPostById} from "../posts/post.repository";
import {getUserById} from "../users/user.repository";
import {CreateCommentSchema, UpdateCommentSchema} from "./comment.schema";

export class CommentController {
    uploadCommentHandler: RequestHandler = async(req, res, next) => {
        try {
            const userId = req.user?.id as string;

            if (!userId) {
                return res.status(401).json({
                    message: "You must be logged in to comment."
                })

            }

            // lemme think if i'm going to make this feature
            let commentType: 'PUBLIC' | 'PRIVATE';

            if (!userId) {
                commentType = 'PUBLIC'
            } else {
                commentType = 'PRIVATE'
            }

            const postId = req.query.id as string;

            if (!postId) return res.sendStatus(404);

            const post = await getPostById(postId);

            // handle comments to private blogs
            if (!post!.published) {
                return res.sendStatus(403)
            }

            const validated = CreateCommentSchema.parse(req.body);
            const {content: comment} = validated;

            const newComment = await createComment(
                postId, 
                userId,
                comment, 
                commentType
            )

            res.status(201).json({
                data: newComment
            })
        } catch (err) {
            res.status(500)
            next(err)
        }
    }

    updateCommentHandler: RequestHandler = async(req, res, next) => {
        try {
            // check if there's a user for authentication
            const userId = req.user?.id as string;
            if (!userId) {
                return res
                    .status(401)
                    .json({message: "Unauthorized. You are not logged-in!"});
            }

            // check if user is existing
            const user = await getUserById(userId);
            if (!user) {
                return res
                    .status(401)
                    .json({message: "Unauthorized"});
            }

            const commentId = req.params.commentId as string;

            const comment = await getCommentById(commentId);

            if (!comment) {
                return res
                    .status(404)
                    .json({message: "Comment not found."});
            }

            // check ownership
            if (comment.userId !== user.id) {
                return res
                    .status(403)
                    .json({
                        message: "Permission denied", 
                        detail: "You can only edit or delete comments you created"
                    })
            }

            const validated = UpdateCommentSchema.parse(req.body)
            const {content} = validated;

            await updateComment(commentId, content);

            res.json({
                message: "Comment successfully updated."
            });
        } catch (err) {
            res.status(500)
            next(err)
        }
    }

    deleteCommentHandler: RequestHandler = async(req, res, next) => {
        try {
            const userId = req.user?.id as string;

            if (!userId) {
                return res
                    .status(401)
                    .json({
                        message: "Unauthorized"
                    })
            }

            const commentId = req.params.commentId as string;

            const comment = await getCommentById(commentId);

            if (!comment) {
                return res
                    .status(404)
                    .json({
                        message: "Comment not found."
                    })
            }

            if (comment.userId !== userId || !comment.userId) {
                return res
                    .status(404)
                    .json({
                        message: "Permission denied", 
                        detail: "You can only edit or delete comments you created"
                    })
            }

            await deleteCommentById(commentId);
            
            res.json({
                status: "success",
                message: "Delete comment successfully."
            });
        } catch (err) {
            next(err)
        }
    }
}
