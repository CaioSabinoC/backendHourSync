const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Garante que a pasta existe antes de qualquer upload
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const nomeUnico = Date.now() + '-' + file.originalname;
    cb(null, nomeUnico);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limite
});

module.exports = upload;
