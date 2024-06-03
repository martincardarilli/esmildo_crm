import { Router } from "express";
import path from "path";

const router = Router();

router.post('/', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  let uploadedFile = req.files.file;
  let uploadPath = path.join(__dirname, '../uploads/', uploadedFile.name);

  uploadedFile.mv(uploadPath, (err) => {
    if (err) return res.status(500).send(err);
    res.json({ filePath: '/uploads/' + uploadedFile.name });
  });
});

export default router;
