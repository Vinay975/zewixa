# Habita Backend API

Professional Node.js/Express backend for Habita property rental platform.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Copy environment file
copy .env.example .env

# Edit .env with your credentials

# Start server
npm start
```

## 📁 Project Structure

```
src/
├── config/          # Configuration files
├── models/          # Database models
├── controllers/     # Business logic
├── routes/          # API routes
├── middleware/      # Custom middleware
├── utils/           # Utility functions
└── app.js           # Express app
```

## 🔌 API Endpoints

### Hostels
- `POST /api/hostels` - Create hostel
- `GET /api/hostels` - Get all hostels
- `DELETE /api/hostels` - Delete all hostels

### Apartments
- `POST /api/apartments` - Create apartment
- `GET /api/apartments` - Get all apartments

### Users
- `POST /api/users/signup` - User registration
- `POST /api/users/signin` - User login

### Hosts
- `POST /api/hosts/signup` - Host registration
- `POST /api/hosts/signin` - Host login

## 🔐 Environment Variables

Required in `.env`:
- `PORT` - Server port
- `MONGODB_URI` - MongoDB connection string
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret
- `JWT_SECRET` - JWT secret key

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **File Upload**: Multer + Cloudinary
- **Authentication**: JWT + Bcrypt
- **Environment**: dotenv

## ✅ Features

- ✅ Professional folder structure
- ✅ Environment-based configuration
- ✅ Separation of concerns (MVC pattern)
- ✅ Image upload with caching
- ✅ JWT authentication
- ✅ Error handling
- ✅ CORS enabled
- ✅ Backward compatible

## 📝 License

Private - Habita Platform
