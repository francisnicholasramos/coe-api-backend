import prisma from "./prismaClient";

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

export const updatePostById = async (
    id: string,
    title: string,
    content: string,
    published: boolean
) => {
    return prisma.post.update({
        where: {id},
        data: {
            title: title,
            content: content,
            published: published
        }
    })
}

export const getUserById = async (id: string) =>
    prisma.user.findUnique({where: {id}})

export const deletePostById = async (id: string) => {
    return prisma.post.delete({
        where: {id}
    })
}

export const getPostById = async (id: string) => {
    return prisma.post.findUnique({
        where: {id}
    })
}
