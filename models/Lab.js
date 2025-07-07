import mongoose from 'mongoose';

const labSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
  phone: String,
  email: String,
  description: String,
  coverImage: String,
  workHours: String,
  openTime:String,
  closeTime:String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const Lab= mongoose.model('Lab', labSchema);
export default Lab;
