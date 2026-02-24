import type {RequestHandler} from "express";
import jwt from "jsonwebtoken";

export const softAuth: RequestHandler = async (req, res, next) => {
    const accessToken = req.cookies?.accessToken;

    if (!accessToken) return next(); // proceed as anonymous comment

    try {
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET as string) as JwtPayload
        req.user = { id: decoded.id, username: decoded.username };
        next()
    } catch (err) {
        next() // token invalid/expired continue as anonymous
    }
}
