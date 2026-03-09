import type {RequestHandler} from "express";
import {changePasswordService} from "./user.service";
import {ChangePasswordSchema} from "./user.schema";

export class UserContoller {
    changePassword: RequestHandler = async (req, res) => {
        try {
            const userId = req.user.id; 

            const validated = ChangePasswordSchema.parse(req.body);
            const { currentPassword, newPassword, confirmPassword } = validated;

            await changePasswordService(userId, currentPassword, newPassword, confirmPassword);

            // Clear both cookies to kill the session
            res.clearCookie("accessToken", {
                httpOnly: true,
                secure: true,
                sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
                path: "/",
            });
            res.clearCookie("refreshToken", {
                httpOnly: true,
                secure: true,
                sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
                path: "/",
            });

            res.status(200).json({ 
                message: "Password changed successfully" 
            });
        } catch (error: any) {
            const statusMap: Record<string, number> = {
                "User not found": 404,
                "Current password is incorrect": 401,
                "New password and confirm password do not match": 400,
            };

            const status = statusMap[error.message] ?? 500;
            res.status(status).json({ message: error.message });
        }
    };
}
