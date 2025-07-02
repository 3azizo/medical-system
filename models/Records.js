import mongoose from "mongoose";

const recordsSchema = new mongoose.Schema({
  blood_glucose: {
    type: Number,
    required: true,
  },
  time_period: {
    type: String,
    required: true,
    enum: [
      "Before breakfast",
      "After breakfast",
      "Before lunch",
      "After lunch",
      "Before dinner",
      "After dinner",
      "Before sleep",
      "Random"
    ],
  },
  date: {
    type: String,
  },
  time: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
});

const Records = mongoose.model("Records", recordsSchema);
export default Records;
