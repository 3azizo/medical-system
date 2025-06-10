import express from 'express';
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';
import checkRole from '../middleware/roleMiddleware.js';

import {addLab, getAllLabs,deleteLab,getAllUsers,banUser } from '../controllers/adminController.js';

// جميع الروتات دي خاصة بالـ Admin فقط
router.use(protect, checkRole('admin'));
//add lab and delete lab
router.post("/labs",addLab)

router.get('/labs', getAllLabs);
router.delete('/labs/:id', deleteLab);
// router.patch("/labs/:id/deactivate", softDeleteLab);
router.get('/users', getAllUsers);
router.patch('/users/:id/ban', banUser);


export default router;
