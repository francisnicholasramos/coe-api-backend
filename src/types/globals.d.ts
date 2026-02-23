namespace Express {
    interface Request {
        user: { id: string, username: string }
        token: string
    }
}

interface JwtPayload {
    sub: string 
    id: string
    username: string
}
