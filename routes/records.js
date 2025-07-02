// routes/readings.js
import express from "express";
import Records from "../models/Records.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

// Middleware to protect routes
 router.use(protect);
// 
router.post("/", async (req, res) => {
  try {
    const { blood_glucose, time_period, date, time } = req.body;
    const records = new Records({
      blood_glucose,
      time_period,
      date,
      time,
      user: req.user.id,
    });
    await records.save();
    console.log(records);
    res.status(201).json({ message: "Reading saved", data: records });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});
router.get('/', async (req, res) => {
  try {
    const records = await Records.find({ user: req.user.id })
    res.json({ records });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const record = await Records.findById(id);
      if (!record) {
      return res.status(404).json({ error: 'record not found' });
    }
    record.delete();
    res.json({ message: 'record deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
})

export default router;
