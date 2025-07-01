import express from 'express';
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';
import checkRole from '../middleware/roleMiddleware.js';

import {addLab, getAllLabs,deleteLab,getAllUsers,banUser } from '../controllers/adminController.js';


router.use(protect, checkRole('admin'));
router.post("/labs",addLab)

router.get('/labs', getAllLabs);
router.delete('/labs/:id', deleteLab);
router.get('/users', getAllUsers);
router.patch('/users/:id/ban', banUser);
export default router;
