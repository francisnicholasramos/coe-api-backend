import prisma from "../database/prismaClient";

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

export const findUserById = async (userId: string) => {
    return await prisma.user.findUnique({
        where: {id: userId},
        select: {id: true, password: true}
    })
}
    
export const getUserById = async (id: string) =>
    prisma.user.findUnique({where: {id}})
