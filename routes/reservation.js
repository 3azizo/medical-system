import express from 'express';
const router = express.Router();
import {protect} from '../middleware/authMiddleware.js';
import checkRole from '../middleware/roleMiddleware.js';
import { createReservation,getLabReservations,getReservation,updateReservationStatus } from '../controllers/reservationController.js';

//NEW Reservation
router.post('/', protect, checkRole('user'), createReservation);
// المستخدم يشوف حجوزاته
router.get('/', protect, checkRole('user'), getReservation);    

// المعمل يشوف الحجوزات
router.get('/lab', protect, checkRole('medical_lab'), getLabReservations);
//   put /api/reservations/:id
router.put('/:id/status', protect, checkRole('medical_lab'), updateReservationStatus);

export default router;
