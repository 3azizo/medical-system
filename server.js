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
// Test routes
import testRoutes from './routes/test.js';
app.use('/api/results', testRoutes);
// Notification routes
import notificationRoutes from './routes/notification.js';
app.use('/api/notification', notificationRoutes);
// Reservation routes
import reservationRoutes from './routes/reservation.js';  
app.use('/api/reservation', reservationRoutes);
// Lab routes
import labRoutes from './routes/labs.js';
app.use('/api/labs', labRoutes);
// Admin routes
import adminRoutes from './routes/admin.js';
app.use('/api/admin', adminRoutes);
// wellcome message in root rout
app.get("/",(req,res)=>{
  res.send(`<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8" /> 
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/> 
    <title>Medical Lab API</title> 
    <style> body { margin: 0; padding: 0; font-family: 'Segoe UI', sans-serif; 
    background: #0f172a; color: #f8fafc; display: flex; align-items: center; 
    justify-content: center; height: 100vh; flex-direction: column; text-align: center; }
     h1 { font-size: 3rem; margin-bottom: 1rem; color: #38bdf8; } 
     p { font-size: 1.2rem; color: #cbd5e1; } 
     .version { margin-top: 1rem; font-size: 0.9rem; color: #94a3b8; }
      </style> 
      </head>
       <body> 
        <h1>🧬 Medical Lab API</h1> <p>Welcome to the backend service.
            <br> All systems are running smoothly.</p> <br>
            <a href="https://github.com/3azizo/medical-system" target="_blank" style="text-decoration: none; color: #38bdf8; font-size: 1.2rem;">GitHub Repository</a>
        <div class="version">Developed by Mohamed (عزيزو) — v1.0</div>
    </body>
     </html> `)

})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));