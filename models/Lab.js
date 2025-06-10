import mongoose from 'mongoose';

const labSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
  phone: String,
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const Lab= mongoose.model('Lab', labSchema);
export default Lab;
