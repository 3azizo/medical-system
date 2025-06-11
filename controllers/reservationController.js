import Reservation from "../models/Reservation.js";
import sendNotification from "../utils/sendNotification.js";

export const createReservation = async (req, res) => {
  const {name,time, labId, service, date } = req.body;

  try {
    const reservation = new Reservation({
      user: req.user.id,
      lab: labId,
      service,
      date,
      name,
      time,
    });

    await reservation.save();

    await sendNotification(
      labId,
      `طلب حجز جديد من مستخدم لاختبار: ${testType}`
    );

    res.status(201).json({ msg: 'Reservation created', reservation });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
};
export const getReservation = async (req, res) => {
  try {
    const reservations = await Reservation.find({ user: req.user.id })
      .populate('lab', 'name address phone email')
      .sort({ createdAt: -1 });

    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
}
export const getLabReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ lab: req.user.id })
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
};

export const updateReservationStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) return res.status(404).json({ msg: 'Not found' });

    if (reservation.lab.toString() !== req.user.id)
      return res.status(403).json({ msg: 'Access denied' });

    reservation.status = status;
    await reservation.save();

    await sendNotification(
      reservation.user,
      `تم ${status === 'accepted' ? 'قبول' : 'رفض'} حجزك لاختبار ${reservation.testType}`
    );

    res.status(200).json({ msg: 'Updated successfully', reservation });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
};
