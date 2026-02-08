import prisma from "../database/prismaClient";

export const createComment = async (
    postId: string,
    user: string | null,
    comment: string,
    type: 'PUBLIC' | 'PRIVATE'
) => {
    return prisma.comment.create({
        data: {
            postId,
            username: user || 'Anonymous',
            content: comment,
            type
        }
    })
}

export const getCommentByPostId = async (
    id: string,
) => {
    return prisma.comment.findUnique({
        where: {id}
    })
}

export const updateComment = async (
    postId: string,
    comment: string
) => {
    return prisma.comment.update({
        where: {id: postId},
        data: {
            content: comment
        }
    })
}
