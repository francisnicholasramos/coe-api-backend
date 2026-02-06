import type {RequestHandler} from "express";
import {createUser} from "../users/local-users.repository";
import prisma from "../database/prismaClient";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


export const postSignUp: RequestHandler = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10)

        await createUser(username, hashedPassword, email)

        res.status(201).json({
            message: "User created successfully."
        })
    } catch (err) {
        res.send(err)
    }
}

export const login: RequestHandler = async (req, res) => {
    try {
        const {username, password} = req.body

        const validateUser = await prisma.user.findUnique({where: {username}})

        if (!validateUser) return res.status(404).json({message: "User does not exist."})

        const match = await bcrypt.compare(password, validateUser.password)

        if (!match) return res.status(401).json({message: "Incorrect password."})
        
        const user = validateUser;

        const token = jwt.sign({sub: user.id}, process.env.JWT_SECRET as string, {expiresIn: "1h"})

        res.json({
            token: token
        })
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error."
        })
    }
}
