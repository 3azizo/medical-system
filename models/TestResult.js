import mongoose from "mongoose";
const testResultSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  testType: {
    type: String,
    required: true,
  },
  values: {
    type: Map,
    of: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId, // الطبيب أو المستخدم
    ref: 'User',
  }
});
const testResult = mongoose.model('TestResult', testResultSchema);
export default testResult