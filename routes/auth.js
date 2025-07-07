import express from 'express';
const router = express.Router();
import { register,login,updateProfile ,verifyOTP} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { uploadImage } from "../utils/uploadCloudinary.js"

router.post('/register', register);
router.post('/login', login);
router.post('/verify-otp', verifyOTP);
router.patch('/profile',protect,uploadImage.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'coverImage', maxCount: 1 }
  ]),
  updateProfile
);
export default router;