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
            req.user = { id: decoded.id }; // populate req.user.id
            next()
        } catch(err) {
            return res.sendStatus(401)
        }
    } else {
        return res
            .status(403)
            .json({
                message: 'Authentication is required. Please log in first.'
            })
    }
}
