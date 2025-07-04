import express from 'express';
const router = express.Router();
import {protect} from '../middleware/authMiddleware.js';
import checkRole from '../middleware/roleMiddleware.js';
import { createReservation,getLabReservations,getReservation,updateReservationStatus,uploadLabResult,getLabResult } from '../controllers/reservationController.js';
import {uploadPDF} from '../utils/uploadCloudinary.js';
//NEW Reservation
router.post('/', protect, checkRole('user'), createReservation);
// المستخدم يشوف حجوزاته
router.get('/', protect, checkRole('user'), getReservation);    

// المعمل يشوف الحجوزات medical_lab
router.get('/lab', protect, checkRole('medical_lab'), getLabReservations);
//   put /api/reservation/:id
router.put('/:id', protect, checkRole('medical_lab'), updateReservationStatus);
//   upload lab result
router.post('/:id/lab-result',protect,uploadPDF.single('file'),uploadLabResult);
//   get lab result
router.get("/:id/lab-result",protect,getLabResult);
export default router;
