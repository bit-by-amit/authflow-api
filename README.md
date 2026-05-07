# AuthFlow API

Secure Authentication Backend API built using Node.js, Express.js, MongoDB, JWT, and bcrypt.

---

## Features

- User Signup
- User Login
- Password Hashing using bcrypt
- JWT Authentication
- Cookie-Based Authentication
- Protected Routes
- MongoDB Integration

---

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- cookie-parser

---

## Installation

```bash
git clone https://github.com/bit-by-amit/authflow-api.git
```

```bash
cd authflow-api
```

```bash
npm install
```

```bash
npm start
```

---

## Environment Variables

Create `.env` file:

```env
DB_URL=mongodb://localhost:27017/DB_Connection

JWT_SECRET=your_secret_key
```

---

## API Endpoints

### Signup

```http
POST /api/v1/signup
```

### Login

```http
POST /api/v1/login
```

### Profile

```http
GET /api/v1/profile
```

---

## Authentication Flow

1. User Signup
2. Password Hashing
3. JWT Token Generation
4. Cookie-Based Authentication
5. Protected Route Verification

---

## Future Improvements

- Logout API
- Refresh Tokens
- Email Verification
- Forgot Password
- Role-Based Authorization

---

## Author

Amit Kumar

GitHub:
https://github.com/bit-by-amit
