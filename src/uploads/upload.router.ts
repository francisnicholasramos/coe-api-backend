import { Router } from "express";
import { upload } from "../middleware/upload";

const router = Router();

router.post(
    "/uploadImage",
    upload.single("file"),  // matches TinyMCE's default "file" field
    (req, res) => {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        res.json({ url: req.file.path });  // Cloudinary URL
    }
);
export default router;
