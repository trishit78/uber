# 🚗 Uber Clone - Full Stack Ride Sharing Application

A full-stack ride-sharing application built with the MERN stack, featuring real-time driver-passenger matching, live location tracking, and integrated payment processing.

## 📹 Demo

<!-- Add project demo video/gif here -->
![Demo](./demo.gif)


https://github.com/user-attachments/assets/e1c7577f-93b1-434a-aacf-16cd80ea7bc1


---

## ✨ Features

### For Passengers
- 🔐 **User Authentication** - Secure signup/login with JWT
- 📍 **Location Search** - Google Maps autocomplete for pickup and destination
- 💰 **Fare Estimation** - Real-time fare calculation for different vehicle types
- 🚕 **Vehicle Selection** - Choose from cars, bikes, or autos
- 💳 **Payment Integration** - Razorpay payment gateway integration
- 🔔 **Real-time Notifications** - Live updates on ride status
- 🎯 **Ride Tracking** - Track your driver in real-time

### For Drivers
- 🔐 **Driver Authentication** - Separate authentication flow for drivers
- 📱 **Driver Dashboard** - View and manage ride requests
- 🔔 **Ride Notifications** - Instant notifications for nearby ride requests
- ✅ **Accept/Reject Rides** - Full control over ride acceptance
- 🚗 **Vehicle Management** - Register and manage vehicle details
- 📊 **Ride History** - Track completed rides

### Technical Features
- ⚡ **Real-time Communication** - Socket.io for instant updates
- 🗺️ **Google Maps Integration** - Location services and distance calculation
- 🔄 **State Management** - React Context API
- 💾 **Caching** - Redis for session and location data
- 🎨 **Responsive Design** - Mobile-first Tailwind CSS design
- 🔒 **Secure Authentication** - Bcrypt password hashing + JWT tokens

---

## 🏗️ Architecture

The application consists of three main services:

```
uber-clone/
├── frontend/          # React + Vite frontend
├── backend/           # Express.js + MongoDB backend
└── web socket server/ # Socket.io real-time server
```

### Technology Stack

**Frontend**
- React 19
- Vite
- TailwindCSS
- Socket.io Client
- React Router DOM
- GSAP (animations)
- Axios
- React Razorpay

**Backend**
- Node.js + Express 5
- TypeScript
- MongoDB + Mongoose
- Redis
- JWT Authentication
- Bcrypt
- Google Maps API
- Razorpay API

**WebSocket Server**
- Socket.io
- Redis
- Express
- TypeScript

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB
- Redis
- Google Maps API Key
- Razorpay API Keys

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/uber-clone.git
cd uber-clone
```

2. **Backend Setup**
```bash
cd backend
npm install

# Create .env file
cat > .env << EOL
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRY=1d
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
GOOGLE_MAPS_URL=https://maps.googleapis.com/maps/api
RAZORPAY_API_KEY=your_razorpay_key
RAZORPAY_SECRET_KEY=your_razorpay_secret
EOL

npm run dev
```

3. **WebSocket Server Setup**
```bash
cd "web socket server"
npm install
npm run dev
```

4. **Frontend Setup**
```bash
cd frontend
npm install

# Create .env file
cat > .env << EOL
VITE_RAZORPAY_API_KEY=your_razorpay_key
EOL

npm run dev
```

### Running the Application

Start all services:

1. MongoDB (default port: 27017)
2. Redis (default port: 6379)
3. Backend server (port: 3000)
4. WebSocket server (port: 3001)
5. Frontend (port: 5173)

---

## 📂 Project Structure

### Backend
```
backend/src/
├── config/          # Configuration files (DB, Redis, Razorpay)
├── controllers/     # Route controllers
├── dtos/            # Data transfer objects
├── middleware/      # Auth middleware
├── models/          # Mongoose schemas
├── repositories/    # Database operations
├── routes/          # API routes
├── services/        # Business logic
└── utils/           # Helper functions
```

### Frontend
```
frontend/src/
├── components/      # Reusable React components
├── context/         # Context providers
├── pages/           # Page components
└── utils/           # Helper functions
```

### WebSocket Server
```
web socket server/src/
├── config/          # Socket.io configuration
├── controllers/     # WebSocket event handlers
├── routes/          # HTTP routes for notifications
├── services/        # Redis operations
└── utils/           # Helper utilities
```

---

## 🔑 Key Components

### Real-time Ride Flow

1. **User requests ride** → Backend creates booking
2. **Backend finds nearby drivers** → Uses Redis geospatial queries
3. **WebSocket server notifies drivers** → Socket.io emit to driver sockets
4. **Driver accepts ride** → Backend updates booking status
5. **User notified** → Socket.io emit to user socket
6. **Payment processed** → Razorpay integration
7. **Ride completed** → Status updated in MongoDB

### Authentication Flow

- JWT tokens stored in localStorage
- Protected routes with auth middleware
- Separate auth flows for users and drivers
- Password hashing with bcrypt (10 rounds)

### Location Services

- Google Maps Geocoding API for address → coordinates
- Distance Matrix API for fare calculation
- Places Autocomplete API for search suggestions
- Redis GEOADD/GEORADIUS for driver proximity

---

## 🔐 Environment Variables

### Backend (.env)
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/uber
JWT_SECRET=your_secret_key
JWT_EXPIRY=1d
GOOGLE_MAPS_API_KEY=your_google_maps_key
GOOGLE_MAPS_URL=https://maps.googleapis.com/maps/api
RAZORPAY_API_KEY=your_razorpay_key
RAZORPAY_SECRET_KEY=your_razorpay_secret
```

### Frontend (.env)
```env
VITE_RAZORPAY_API_KEY=your_razorpay_key
```

---

## 📡 API Endpoints

### User Routes
- `POST /api/v1/user/signup` - Register new user
- `POST /api/v1/user/signin` - User login
- `GET /api/v1/user/me` - Get user profile
- `POST /api/v1/user/create` - Create new ride booking
- `GET /api/v1/user/:id` - Get user by ID

### Driver Routes
- `POST /api/v1/driver/signup` - Register new driver
- `POST /api/v1/driver/signin` - Driver login
- `GET /api/v1/driver/me` - Get driver profile
- `POST /api/v1/driver/location` - Update driver location
- `POST /api/v1/driver/confirm` - Confirm ride acceptance
- `GET /api/v1/driver/details/:id` - Get booking details

### Map Routes
- `GET /api/v1/map/suggestions?input={query}` - Get location suggestions
- `GET /api/v1/map/get-fare?pickup={}&destination={}` - Calculate fare

### Payment Routes
- `POST /api/v1/payment/order` - Create Razorpay order

---

## 🎯 Future Enhancements

- [ ] Live GPS tracking on map
- [ ] Ride history and receipts
- [ ] Driver ratings and reviews
- [ ] Multi-language support
- [ ] Push notifications
- [ ] Advanced analytics dashboard
- [ ] In-app chat between driver and passenger
- [ ] Scheduled rides
- [ ] Promo codes and referral system
- [ ] Driver earnings dashboard

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the ISC License.

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)

---

## 🙏 Acknowledgments

- Google Maps Platform for location services
- Razorpay for payment processing
- Socket.io for real-time communication
- MongoDB for database
- Redis for caching and geospatial queries

---

## 📧 Contact

For any queries or suggestions, feel free to reach out!

**Happy Coding! 🚀**
