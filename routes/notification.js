import express from 'express';
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';
import { getNotifications, markAsRead} from '../controllers/notificationController.js';

router.get('/', protect, getNotifications);
router.put('/:id/read', protect, markAsRead);

export default  router;
