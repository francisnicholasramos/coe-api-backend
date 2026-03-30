import type {RequestHandler} from "express";
import jwt from "jsonwebtoken";

export const verifyToken: RequestHandler = async (req, res, next) => {
    const accessToken = req.cookies?.accessToken;
    const refreshToken = req.cookies?.refreshToken;

    // Authorization: Bearer <token> (OPTION 2)
    const bearerHeader = req.headers['authorization']
    const bearerToken = bearerHeader?.split(' ')[1]

    // backwards compatibility
    const token = accessToken || bearerToken;

    if (!token) {
        return res.status(401).json({
            message: 'Authentication is required. Please log in first.',
            refreshable: !!refreshToken,
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload
        req.user = { id: decoded.id }; // populate req.user.id
        next()
    } catch(err) {
        // expired token
        if (err instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
                message: "Token expired.",
                refreshable: true
            })
        }

        // invalid token
        return res.sendStatus(401)
    }
}
