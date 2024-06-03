import { Router } from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta de carga de archivos
router.post('/', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    console.error('No files were uploaded.');
    return res.status(400).send('No files were uploaded.');
  }

  let uploadedFile = req.files.file;
  let uploadDir = path.join(__dirname, '../uploads/');
  let uploadPath = path.join(uploadDir, uploadedFile.name);

  // Crear el directorio si no existe
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  uploadedFile.mv(uploadPath, (err) => {
    if (err) {
      console.error('File upload error:', err);
      return res.status(500).send(err);
    }
    res.json({ filePath: '/uploads/' + uploadedFile.name });
  });
});

export default router;
