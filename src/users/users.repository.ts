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
    
export const getUserById = async (id: string) =>
    prisma.user.findUnique({where: {id}})
