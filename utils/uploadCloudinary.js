import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.config.js';

// 🟢 رفع صور فقط
export const uploadImage = multer({
  storage: new CloudinaryStorage({
    cloudinary,
    params: {
      folder: 'images',
      resource_type: 'image',
      allowed_formats: ['jpg', 'png', 'jpeg'],
    },
  }),
});

// 🟣 رفع PDF فقط
export const uploadPDF = multer({
  storage: new CloudinaryStorage({
    cloudinary,
    params: {
      folder: 'pdfs',
      resource_type: 'raw',
      format: async () => 'pdf',
    },
  }),
});
