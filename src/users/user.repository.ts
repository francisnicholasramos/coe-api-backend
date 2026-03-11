import prisma from "../database/prismaClient";

type UserField = 'default' | 'userIdOnly' | 'withPassword'

const fields = {
    default: undefined,
    userIdOnly: {id: true},
    withPassword: {id: true, password: true}
}

export const createUser = async (
    username: string, 
    password: string,
    email: string
) => {
    return prisma.user.create({
        data: {
            username,
            password,
            email
        }
    })
}

export const updateUserPassword = async (
    userId: string,
    newPassword: string,
) => {
    return await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            password: newPassword }
    })
}
    
export const getUserById = async (id: string, options: UserField='default') => {
    return await prisma.user.findUnique({
        where: {id},
        select: fields[options]
    })
}

export const uploadUserAvatar = async (
    userId: string, 
    imageUrl: string
) => {
    return await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            avatar: imageUrl
        }
    })
}
