import Notification from '../models/Notification.js';
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
};

export const markAsRead = async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, { isRead: true });
    res.status(200).json({ msg: 'Marked as read' });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
};
