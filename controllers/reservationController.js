import Reservation from "../models/Reservation.js";
import Lab from "../models/Lab.js";
import sendNotification from "../utils/sendNotification.js";
import cloudinary from "../config/cloudinary.config.js"

export const createReservation = async (req, res) => {
  const {name,time, labId, service, date,userNote} = req.body;
  if (!labId || !date) {
    return res.status(400).json({ error: 'labId and date are required' });
  }
  try {
    const reservation = new Reservation({
      user: req.user.id,
      lab: labId,
      service,
      date,
      name,
      time,
      userNote,
    });
    
    await reservation.save();
    await sendNotification(
      labId,
      `طلب حجز جديد من مستخدم لاختبار: ${service} في ${date} الساعة ${time}`
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
export const deleteReservation = async (req, res) => {
  try {
    const reservation= await Reservation.findById(req.params.id);
     if (reservation.user.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized' });
    }
    await Reservation.findByIdAndDelete(req.params.id);
    res.status(200).json({mag:"Reservation deleted successfully"});
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
}
export const getLabReservations = async (req, res) => {
  try {
    const lab = await Lab.findOne({ userId: req.user.id });
    if (!lab) return res.status(404).json({ error: 'Lab not found' });
    const reservations = await Reservation.find({lab:lab._id })
      .sort({ createdAt: -1 });

    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
};

export const updateReservationStatus = async (req, res) => {
  const { status,labNote} = req.body;
   const lab = await Lab.findOne({ userId: req.user.id });
    if (!lab) return res.status(404).json({ error: 'Lab not found' });

  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) return res.status(404).json({ msg: 'Not found' });

    if (reservation.status !== 'pending') 
      return res.status(400).json({ msg: 'Reservation already processed' });
    if (reservation.lab.toString() !== lab._id.toString()) 
      return res.status(403).json({ msg: 'Access denied' });

    console.log(reservation.lab.toString(), lab._id.toString());
    reservation.status = status;
    reservation.labNote = labNote;
    await reservation.save();

    await sendNotification(
      reservation.user,
      `تم ${status === 'accepted' ? 'قبول' : 'رفض'} حجزك لاختبار ${reservation.service}`
    );

    res.status(200).json({ msg: 'Updated successfully', reservation });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
};


export const uploadLabResult = async (req, res) => {
  try {
       const lab = await Lab.findOne({ userId: req.user.id });
    if (!lab) return res.status(404).json({ error: 'Lab not found' });

    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) return res.status(404).json({ msg: 'Reservation not found' });
    if (reservation.status !== 'accepted') {
      return res.status(400).json({ msg: 'Reservation not accepted yet' });
    }
    if (reservation.lab.toString() !== lab._id.toString()) 
      return res.status(403).json({ msg: 'Access denied' });

    reservation.pdfUrl = req.file.path;
    reservation.pdfPublicId = req.file.filename;
    await reservation.save();

    res.status(200).json({ msg: 'Lab result uploaded', pdfUrl: reservation.pdfUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
};
export const getLabResult = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation || !reservation.pdfUrl) {
      return res.status(404).json({ msg: 'No lab result found' });
    }

    if (reservation.user.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    res.status(200).json({ pdfUrl: reservation.pdfUrl });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
};
export const deleteLabResult = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation || !reservation.pdfUrl) {
      return res.status(404).json({ msg: 'No lab result found to delete' });
    }

    if (reservation.user.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized' });
    }
    //delete the file from cloudinary
    const cloudinaryR = await cloudinary.uploader.destroy(reservation.pdfPublicId);
    console.log(cloudinaryR);
    reservation.pdfUrl = undefined;
    reservation.pdfPublicId = undefined;
    await reservation.save();

    res.status(200).json({ msg: 'Lab result deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
};