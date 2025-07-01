
// models/Reading.js
import mongoose from "mongoose";

const readingSchema = new mongoose.Schema({
  blood_glucose: {
    type: Number,
    required: true,
  },
  time_period: {
    type: String,
    required: true,
    // enum: [
    //   "Before breakfast",
    //   "After breakfast",
    //   "Before lunch",
    //   "After lunch",
    //   "Before dinner",
    //   "After dinner",
    //   "Before sleep",
    //   "Random"
    // ],
  },
  datetime: {
    type: Date,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
});

const Recods = mongoose.model("Recods", readingSchema);
export default Recods;
