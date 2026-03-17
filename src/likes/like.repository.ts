import prisma from "../database/prismaClient";

export const getAllLikedPosts = async (userId: string) => {
    return await prisma.like.findMany({
        where: {
            userId
        },
        include: {
            post: {
                include: {
                    user: true
                }
            }
        }
    })
}

export const toggleLike = async (postId: string, userId: string) => {
    const existingLike = await prisma.like.findUnique({
        where: {
            userId_postId: {
                userId, 
                postId
            }
        }
    });

    // unlike
    if (existingLike) {
        await prisma.like.delete({
            where: {
                id: existingLike.id
            }
        });
        return {liked: false};
    }

    // like
    await prisma.like.create({
        data: {
            userId,
            postId
        }
    })

    return {liked: true}
}

export const getLikesCount = async (postId: string) => {
    return await prisma.like.count({
        where: {
            postId
        }
    })
}
