import type {RequestHandler} from "express";
import jwt from "jsonwebtoken";

export const verifyToken: RequestHandler = async (req, res, next) => {
    // Authorization: Bearer <token>
    const bearerHeader = req.headers['authorization']

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');

        const bearerToken = bearer[1];

        try {
            const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET as string) as JwtPayload
            req.user = { id: decoded.id };
            next()
        } catch(err) {
            res.sendStatus(401)
        }
    } else {
        res.sendStatus(403);
    }
}
