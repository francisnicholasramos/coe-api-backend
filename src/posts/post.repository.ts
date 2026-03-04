import type {Prisma} from "../generated/prisma/client";
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
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
}

export const getAllUserPosts = async (
    userId: string,
    sortBy: Prisma.PostOrderByWithRelationInput
) => {
    return prisma.post.findMany({
        where: {userId},
        include: {
            user: {
                select: {
                    username: true
                }
            }
        },
        orderBy: sortBy
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
                    id: true,
                    username: true
                }
            },
            comments: {
                select: {
                    id: true,
                    content: true,
                    createdAt: true,
                    user: {
                        select: {
                            username: true
                        }
                    }
                }
            }
        }
    })
}

export const searchPublicPosts = async (query: string) => {
    return prisma.post.findMany({
        where: {
            published: true,
            OR: [ 
                {title: {contains: query, mode: 'insensitive' }},
                {content: {contains: query, mode: 'insensitive' }},
            ]
        },
        include: {
            user: {
                select: {
                    username: true
                }
            }
        },
    })
}

export const searchUserPosts = async (userId: string, query: string) => {
    return prisma.post.findMany({
        where: {
            userId,
            OR: [ 
                {title: {contains: query, mode: 'insensitive' }},
                {content: {contains: query, mode: 'insensitive' }},
            ]
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
