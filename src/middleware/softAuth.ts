import type {RequestHandler} from "express";
import jwt from "jsonwebtoken";

export const softAuth: RequestHandler = async (req, res, next) => {
    const bearerHeader = req.headers['authorization']

    if (!bearerHeader) return next(); // proceed as anonymous comment

    try {
        const bearer = bearerHeader.split(' ');

        if (bearer.length !== 2 || bearer[0] !== 'Bearer') {
            return next() // invalid format, continue as anonymous
        }

        const bearerToken = bearer[1];

        const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET as string) as JwtPayload
        req.user = { id: decoded.id };
        next()
    } catch (err) {
        next() // token invalid/expired continue as anonymous
    }
}
