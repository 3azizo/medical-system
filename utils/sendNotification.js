import Notification from "../models/Notification.js";
const sendNotification = async (userId, message) => {
  const notification = new Notification({
    user: userId,
    message,
  });

  await notification.save();
};

export default sendNotification;
