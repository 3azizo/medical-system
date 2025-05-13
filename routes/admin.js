import express from 'express';
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';
import checkRole from '../middleware/roleMiddleware.js';

import { getAllLabs,deleteLab,softDeleteLab,getAllUsers,banUser } from '../middleware/adminController.js';

// جميع الروتات دي خاصة بالـ Admin فقط
router.use(protect, checkRole('admin'));

router.get('/labs', getAllLabs);
router.delete('/labs/:id', deleteLab);
router.patch("/labs/:id/deactivate", softDeleteLab);
router.get('/users', getAllUsers);
router.patch('/users/:id/ban', banUser);


export default router;
