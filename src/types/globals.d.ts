namespace Express {
    interface Request {
        user: { id: string, username: string }
        token: string
        sortBy: Prisma.PostOrderByWithRelationInput
    }
}

interface JwtPayload {
    sub: string 
    id: string
    username: string
}
