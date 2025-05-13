import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
// app.use(express.urlencoded({ extended: true })); // لتحليل form-data


// Routes
import authRoutes from './routes/auth.js';
app.use('/api/auth', authRoutes);

// protect middleware
import { protect } from './middleware/authMiddleware.js';
app.get('/api/protected', protect, (req, res) => {
  res.json({ msg: `Welcome, your role is: ${req.user.role}` });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));