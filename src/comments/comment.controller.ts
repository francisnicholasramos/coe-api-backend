import {RequestHandler} from "express";
import {createComment, updateComment, getCommentByPostId} from "./comment.repository";

export class CommentController {
    uploadCommentHandler: RequestHandler = async(req, res, next) => {
        try {
            const userId = req.user?.id as string;

            let commentType: 'PUBLIC' | 'PRIVATE';

            if (!userId) {
                commentType = 'PUBLIC'
            } else {
                commentType = 'PRIVATE'
            }

            const postId = req.query.id as string;

            if (!postId) return res.sendStatus(404);

            const {comment} = req.body;

            const newComment = await createComment(postId, null, comment, commentType)

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
            const postId = req.params.postId as string;
            const commentId = req.params.commentId as string;
            const {content, username} = req.body;

            // const comment = await getCommentByPostId();
            
            await updateComment(postId, content)
        } catch (err) {
            res.status(500)
            next(err)
        }
    }
}
