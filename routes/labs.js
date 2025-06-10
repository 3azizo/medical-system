import express from 'express';
import mongoose from 'mongoose';
import Lab from '../models/Lab.js';

const router = express.Router();

// GET /api/labs - Get all labs
router.get('/', async (req, res) => {
  try {
    const labs = await Lab.find({ isActive: true });
    res.json({ labs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/labs/:id - Get single lab by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  try {
    const lab = await Lab.findById(id);
    if (!lab) {
      return res.status(404).json({ error: 'Lab not found' });
    }
    res.json({ lab });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
