import type {RequestHandler} from "express";
import {createUser} from "../users/users.repository";
import {SignUpSchema} from "./auth.schema";
import {generateToken} from "../utils/generateToken";
import prisma from "../database/prismaClient";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as z from "zod";


export const signup: RequestHandler = async (req, res, next) => {
    try {
        const validated = SignUpSchema.parse(req.body);
        const {username, email, password} = validated;
        
        // Check both in parallel for efficiency
        const [userExists, emailExists] = await Promise.all([
            prisma.user.findUnique({ where: { username } }),
            prisma.user.findUnique({ where: { email } }),
        ]);

        if (userExists) {
            return res
                .status(409)
                .json({message: "Username already exists."})
        }

        if (emailExists) {
            return res
                .status(409)
                .json({message: "User already exists with this email."})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await createUser(username, hashedPassword, email)

        res.status(201).json({
            status: "success",
            message: "User created successfully."
        })
    } catch (err) {
        if (err instanceof z.ZodError) {
            return res
                .status(400)
                .json({ message: err.issues[0].message });
        }
        next(err);
    }
}

export const login: RequestHandler = async (req, res) => {
    try {
        const {username, password} = req.body

        const user = await prisma.user.findUnique({
            where: {username}
        })

        if (!user) {
            return res.status(404).json({message: "Invalid email or password."})
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(401).json({message: "Invalid email or password."})
        }
        
        generateToken(user.id, res)

        res.status(201).json({
            status: "success",
        })
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error."
        })
    }
}

export const refresh: RequestHandler = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({
            message: "Refresh token not found."
        })
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string) as { id: string };

        const newAccessToken = jwt.sign(
            { id: decoded.id }, 
            process.env.JWT_SECRET as string, 
            { expiresIn: "10m" }
        );

        res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            path: "/",
            maxAge: 1000 * 60 * 10,
        });

        res.status(200).json({ 
            accessToken: newAccessToken 
        });
    } catch (err) {
        return res.status(403).json({ 
            message: "Invalid refresh token" 
        });
    }
}

export const logout: RequestHandler = async (req, res) => {
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        path: "/",
    });

    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        path: "/refresh-token",
    });

    res.status(200).json({
        status: "success",
        message: "Logged out successfully."
    })
}
