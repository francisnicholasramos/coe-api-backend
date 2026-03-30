import jwt from "jsonwebtoken";
import {Response} from "express";

export const generateToken = (userId: string, res: Response) => {
    const payload = {id: userId};

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: "15m",
    });

    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string, {
        expiresIn: "7d"
    })

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        path: "/",
        maxAge: 1000 * 60 * 15,
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        path: "/",
        maxAge: 1000 * 60 * 60 * 24 * 7,
    });
}
