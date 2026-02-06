namespace Express {
    interface Request {
        user: { id: string }
        token: string
    }
}

interface JwtPayload {
    sub: string 
    id: string
}
