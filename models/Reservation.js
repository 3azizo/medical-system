import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  lab: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lab',
    required: true,
  },
     name: {
      type: String,
      required: true,
    },
  time: {
    type: String,
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  },
    userNot: { type: String, default: '' },  
    labNote: { type: String, default: '' },  
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Reservation= mongoose.model('Reservation', reservationSchema);
export default Reservation;
