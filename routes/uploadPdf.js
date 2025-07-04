// uploadPdf.route.js
import express from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.config.js';

const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'pdfs', // اسم المجلد على Cloudinary
    resource_type: 'raw', // مهم جدًا لـ PDF
    format: async (req, file) => 'pdf',
  },
});

const upload = multer({ storage });

router.post('/upload-pdf', upload.single('file'), (req, res) => {
  console.log('File upload request received:');
  try {
    if (!req.file) return res.status(400).json({ msg: 'No file uploaded' });

    res.status(200).json({
      msg: 'File uploaded successfully',
      cloudinaryUrl: req.file.path,
      public_id: req.file.filename,
    });
  } catch (err) {
    console.error('Upload Error:', err);
    res.status(500).json({ msg: 'Upload failed' });
  }
});

export default router;
