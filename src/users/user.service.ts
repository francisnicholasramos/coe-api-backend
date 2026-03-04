import bcrypt from "bcrypt";
import { findUserById, updateUserPassword } from "./user.repository";

export const changePasswordService = async (
    userId: string,
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
) => {
    if (newPassword !== confirmPassword) {
        throw new Error("New password and confirm password do not match");
    }

    const user = await findUserById(userId);
    if (!user) {
        throw new Error("User not found");
    }

    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
        throw new Error("Current password is incorrect");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await updateUserPassword(userId, hashedPassword);
};
