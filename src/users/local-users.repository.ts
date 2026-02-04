import prisma from "../database/prismaClient";

export const createUser = async (
    username: string, 
    password: string
) => {
    return prisma.user.create({
        data: {
            username,
            password
        }
    })
}
