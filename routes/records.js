// routes/readings.js
import express from "express";
import Records from "../models/Records.js";
const router = express.Router();

// 
router.post("/", async (req, res) => {
  try {
    const { blood_glucose, time_period, date, time, userId } = req.body;

    const datetime = new Date(`${date}T${time}`);

    const records = new Records({
      blood_glucose,
      time_period,
      datetime,
      user: userId
    });

    await records.save();
    res.status(201).json({ message: "Reading saved", data: reading });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});
router.get('/', async (req, res) => {
  try {
    const records = await Records.find({ isActive: true });
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
    res.json({ record });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
})

export default router;
