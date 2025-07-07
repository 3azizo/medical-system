import express from 'express';
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';
import checkRole from '../middleware/roleMiddleware.js';

import {addLab,deleteLab,getAllUsers,banUser,getAllLabs } from '../controllers/adminController.js';


router.use(protect, checkRole('admin'));
// Add a new lab and user account
router.post("/labs",addLab)
// Delete a lab 
router.delete('/labs/:id', deleteLab);
// Get all labs and users
// router.get('/labs', getAllLabs); 
router.get('/users', getAllUsers);
// Ban a user
router.patch('/users/:id/ban', banUser);

export default router;
