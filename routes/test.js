import { addTestResult, getUserResults } from '../controllers/testController.js';
import {protect} from '../middleware/authMiddleware.js';
import express from 'express';
import checkRole from '../middleware/roleMiddleware.js';
const router = express.Router();



router.post('/', protect, addTestResult);        // إدخال نتيجة
router.get('/', protect, getUserResults);        // عرض النتائج
router.post('/', protect, checkRole('medical_lab', 'user'), addTestResult);

export default router;