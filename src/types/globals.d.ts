namespace Express {
    interface Request {
        user: { id: string }
        token: string
        sortBy: Prisma.PostOrderByWithRelationInput
    }
}

interface JwtPayload {
    sub: string 
    id: string
    username: string
}
