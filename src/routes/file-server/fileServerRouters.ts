import express from "express";
import { checkReferer, setFile, upload } from "../../controllers/file-server/setFile";
// import { getFile } from "../../controllers/file-server/getFile";

const router = express.Router();

// router.get("/get-file", getFile);
router.post("/upload", checkReferer, upload.single('file'), setFile);

export default router;