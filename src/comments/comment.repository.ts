import prisma from "../database/prismaClient";

export const createComment = async (
    postId: string,
    userId: string | null,
    comment: string,
    type: 'PUBLIC' | 'PRIVATE'
) => {
    return prisma.comment.create({
        data: {
            postId,
            userId: userId || null,
            content: comment,
            type
        },
        include: {
            user: {
                select: {
                    username: true
                }
            }
        }
    })
}

export const getCommentById = async (
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

export const deleteCommentById = async (id: string) => {
    return prisma.comment.delete({
        where: {id}
    })
}
