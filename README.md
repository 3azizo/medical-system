# medical-system
Medical System Graduation project backend (Node.js - Express - MongoDB)

## 🚀 Features

- User & Lab registration and login (JWT-based auth)
- User profile management
- Manual input of blood test results
- AI-based analysis of test data
- Admin dashboard for lab & user control
- Reservation system for lab booking
- Test result sharing & history
- Token-based API security

---
## 📁 Project Structure

```
├── controllers/         # Logic for each API
├── models/              # MongoDB models
├── routes/              # API route handlers
├── middleware/          # Auth & role checks
├── config/              # DB connection setup
├── server.js            # App entry point
```


---
## 🛠️ Setup Instructions

1. Clone the repo:
```bash
git https://github.com/3azizo/medical-system.git
cd medical-system
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

4. Run the server:
```bash
npm start
```
## 📌 API Endpoints 

### Auth
- `POST /api/auth/register` – Register user/lab
- `POST /api/auth/login` – Login and get JWT

### Profile
- `PUT /api/auth/profile` – Update user or lab profile

### Medical Results
- `POST /api/results` – Submit blood test
- `GET /api/results` – Get user's test results
- `GET /api/results/:id` – Get a single result

### AI Analysis
- ``not work yet``
- `POST /api/ai/analyze` – Analyze test values
- `GET /api/ai/history` – Get AI analysis history

### Reservations
- `POST /api/reservations` – Book lab test
- `GET /api/reservations` – View reservations

### Admin
- `GET /api/admin/labs` – List all labs
- `PATCH /api/admin/labs/:id/deactivate` – Deactivate lab
- `GET /api/admin/users` – List users
- `PATCH /api/admin/users/:id/ban` – Ban a user

### Sharing
- `POST /api/results/:id/share` – Share result

---

## 🛡️ Authorization
All protected routes require:
```http
Authorization: Bearer <JWT_TOKEN>
```

---
## 🔍 Sample .env
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/medlab
JWT_SECRET=supersecretjwt
```
---

## 👨‍💻 Author
Mohamed (aka "عزيزو")