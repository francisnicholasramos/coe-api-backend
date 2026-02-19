import prisma from "../database/prismaClient";

export const createPost = async (
    title: string,
    content: string,
    published: boolean,
    userId: string
) => {
    return prisma.post.create({
        data: {
            title,
            content,
            published,
            userId
        }
    })
}

export const getPublicPosts = async () => {
    return prisma.post.findMany({
        where: { published: true },
        include: {
            user: {
                select: {
                    username: true
                }
            },
            comments: {
                select: {
                    id: true,
                    content: true,
                    createdAt: true,
                    type: true,
                    userId: true
                }
            }
        }
    })
}

export const getAllUserPosts = async (
    userId: string
) => {
    return prisma.post.findMany({
        where: {userId},
    })
}

export const updatePostById = async (
    id: string,
    data: { 
        title?: string; 
        content?: string; 
        published?: boolean 
    }
) => {
    return prisma.post.update({
        where: {id},
        data
    })
}

export const deletePostById = async (id: string) => {
    return prisma.post.delete({
        where: {id}
    })
}

export const getPostById = async (id: string) => {
    return prisma.post.findUnique({
        where: {id},
        include: {
            user: {
                select: {
                    username: true
                }
            }
        }
    })
}
