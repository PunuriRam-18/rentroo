const Booking = require('../models/Booking');

const createBooking = async (req, res) => {

    try {

        const {
            car,
            startDate,
            endDate
        } = req.body;

        const existingBooking = await Booking.findOne({

            car,

            startDate: {
                $lte: endDate
            },

            endDate: {
                $gte: startDate
            }
        });

        if (existingBooking) {

            return res.status(400).json({
                message: 'Car already booked for selected dates'
            });
        }

        const booking = await Booking.create({

            user: req.user.id,
            car,
            startDate,
            endDate
        });

        res.json({
            message: 'Booking successful',
            booking
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

const getMyBookings = async (req, res) => {

    try {

        const bookings = await Booking.find({
            user: req.user.id
        })
        .populate('car')
        .populate('user', '-password');

        res.json(bookings);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

const cancelBooking = async (req, res) => {

    try {

        const booking = await Booking.findById(req.params.id);

        if (!booking) {

            return res.status(404).json({
                message: 'Booking not found'
            });
        }

        await booking.deleteOne();

        res.json({
            message: 'Booking cancelled successfully'
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    createBooking,
    getMyBookings,
    cancelBooking
};