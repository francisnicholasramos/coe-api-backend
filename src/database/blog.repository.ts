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

export const getUserById = async (id: string) =>
    prisma.user.findUnique({where: {id}})

