const express = require('express');

const dotenv = require('dotenv');

const cors = require('cors');

const connectDB = require('./config/db');

const protect = require('./middleware/authMiddleware');

const authRoutes = require('./routes/authRoutes');

const carRoutes = require('./routes/carRoutes');

const bookingRoutes = require('./routes/bookingRoutes');

const User = require('./models/User');

dotenv.config();


connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/auth', authRoutes);

app.use('/api/cars', carRoutes);

app.use('/api/bookings', bookingRoutes);

app.get('/', (req, res) => {

    res.send('Rentroo API Running');
});

app.get('/users', (req, res) => {

    res.json([
        {
            name: 'Ram',
            role: 'customer'
        },
        {
            name: 'Admin',
            role: 'admin'
        }
    ]);
});

app.get('/profile', protect, async (req, res) => {

    try {

        const user = await User.findById(req.user.id)
            .select('-password');

        res.json(user);

    } catch (error) {

        res.json({
            message: error.message
        });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);
});