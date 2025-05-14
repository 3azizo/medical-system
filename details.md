# 📘 Full API Endpoints – Detailed Reference

This document outlines all the API endpoints built for the Medical Lab backend project.

---

## 🔐 Authentication

### 1. Register (User / Lab)
- **URL:** `/api/auth/register`
- **Method:** POST
- **Headers:** None
- **Request Body:**
```json
{
  "name": "John",
  "email": "john@mail.com",
  "password": "123456",
  "role": "user" // or "medical_lab"
}
```
- **Response:**
```json
{
  "token": "JWT_TOKEN",
  "user": { "_id": "...", "role": "user" }
}
```

### 2. Login
- **URL:** `/api/auth/login`
- **Method:** POST
- **Headers:** None
- **Request Body:**
```json
{
  "email": "john@mail.com",
  "password": "123456"
}
```
- **Response:**
```json
{
  "token": "JWT_TOKEN",
  "user": { "_id": "...", "role": "user" }
}
```

---

## 🧾 Profile

### 3. Update Profile
- **URL:** `/api/profile`
- **Method:** PUT
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:** (Example for user)
```json
{
  "name": "New Name",
  "phone": "01123456789"
}
```
- **Response:**
```json
{
  "message": "Profile updated",
  "user": { ...updated fields... }
}
```

---

## 💉 Blood Test Results

### 4. Add Test Result
- **URL:** `/api/results`
- **Method:** POST
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
```json
{
  "hemoglobin": 12.3,
  "wbc": 7400,
  "rbc": 4.6,
  "platelets": 210000,
  "glucose": 95
}
```
- **Response:**
```json
{
  "message": "Result saved",
  "result": { ... }
}
```

### 5. Get All Results
- **URL:** `/api/results`
- **Method:** GET
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
```json
{
  "results": [ {...}, {...} ]
}
```

### 6. Get One Result
- **URL:** `/api/results/:id`
- **Method:** GET
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
```json
{
  "result": { ... }
}
```

---

## 🧠 AI Analysis

### 7. Analyze Test `not work yet`
- **URL:** `/api/ai/analyze`
- **Method:** POST
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:** (Same as test values)
- **Response:**
```json
{
  "recommendation": "Increase iron intake...",
  "analysis": { ... }
}
```

### 8. Get Analysis History
- **URL:** `/api/ai/history`
- **Method:** GET
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
```json
{
  "history": [ ... ]
}
```

---

## 📅 Reservations

### 9. Create Reservation
- **URL:** `/api/reservations`
- **Method:** POST
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
```json
{
  "labId": "<lab_id>",
  "date": "2025-05-20",
  "notes": "Fasting"
}
```
- **Response:**
```json
{
  "message": "Reservation created",
  "reservation": { ... }
}
```

### 10. Get Reservations
- **URL:** `/api/reservations`
- **Method:** GET
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
```json
{
  "reservations": [ ... ]
}
```

---

## 🧑‍⚕️ Admin Endpoints

### 11. Get Labs
- **URL:** `/api/admin/labs`
- **Method:** GET
- **Headers:** `Authorization: Bearer <admin-token>`

### 12. Deactivate Lab
- **URL:** `/api/admin/labs/:id/deactivate`
- **Method:** PATCH
- **Headers:** `Authorization: Bearer <admin-token>`

### 13. Get Users
- **URL:** `/api/admin/users`
- **Method:** GET
- **Headers:** `Authorization: Bearer <admin-token>`

### 14. Ban User
- **URL:** `/api/admin/users/:id/ban`
- **Method:** PATCH
- **Headers:** `Authorization: Bearer <admin-token>`

---

## 📤 Share Test Result

### 15. Share Result with Another User
- **URL:** `/api/results/:id/share`
- **Method:** POST
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
```json
{
  "recipientId": "<user_id>"
}
```
- **Response:**
```json
{
  "message": "Result shared"
}
```

---

## 🔚 Sign Out

- Not handled via backend. Just delete token on frontend.

---

End of API Details
