const express = require('express');
const app = express();

const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');

const { connectDB } = require('./config/database');
const userRoute = require('./routes/User');
const profileRoute = require('./routes/Profile');

const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: [process.env.FRONTEND_URL],
  credentials: true,
}));

connectDB();

app.use(express.json());
app.use(cookieParser());

// API mount points
app.use('/api/v1/auth', userRoute);
app.use('/api/v1', profileRoute);

app.get('/', (req, res) => {
  return res.json({
    success: true,
    message: 'Your server is running',
  });
});

app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
