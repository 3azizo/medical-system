import express from 'express';
const router = express.Router();
import {protect} from '../middleware/authMiddleware.js';
import checkRole from '../middleware/roleMiddleware.js';
import { createReservation,getLabReservations,updateReservationStatus } from '../controllers/reservationController.js';


// الحجز من المستخدم
router.post('/', protect, checkRole('user'), createReservation);

// المعمل يشوف الحجوزات
router.get('/lab', protect, checkRole('medical_lab'), getLabReservations);

// المعمل يغيّر حالة الحجز
router.put('/:id/status', protect, checkRole('medical_lab'), updateReservationStatus);

export default router;
