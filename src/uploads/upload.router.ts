import { Router } from "express";
import {verifyToken} from "../middleware/verifyToken";
import { handleImageUpload, handleDeleteUponPost, handleAvatarUpload} from "./upload.controller";
import multer from "multer";

const router = Router();

const upload = multer({storage: multer.memoryStorage()});

router.post(
    "/uploadImage", 
    upload.single('file'),
    handleImageUpload
);

router.post(
    "/uploadAvatar",
    verifyToken,
    upload.single('file'),
    handleAvatarUpload
)

router.delete(
    "/uploadImage",
    handleDeleteUponPost
);

export default router;
