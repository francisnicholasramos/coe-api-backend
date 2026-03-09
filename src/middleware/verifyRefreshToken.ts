import {RequestHandler} from "express";
import jwt from "jsonwebtoken";
import prisma from "../database/prismaClient";

export const verifyRefreshToken: RequestHandler = async (req, res, next) => {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({
            message: "Refresh token required."
        })
    }

    try {
        const isBlocklisted = await prisma.blocklist.findUnique({
            where: {
                token: refreshToken
            }
        })

        if (isBlocklisted) {
            return res.status(401).json({ 
                message: "Token has been revoked." 
            });
        }

        const decoded = jwt.verify(
            refreshToken, 
            process.env.JWT_REFRESH_SECRET as string,
        ) as JwtPayload;

        req.user = {id: decoded.id}
        next();
    } catch (err) {
        return res.status(401).json({ 
            message: "Invalid or expired refresh token." 
        });
    }
}

