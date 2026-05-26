const Car = require('../models/Car');

const addCar = async (req, res) => {

    try {

        const {
            name,
            brand,
            pricePerDay,
            fuelType,
            seats
        } = req.body;

        const car = await Car.create({

            name,
            brand,
            pricePerDay,
            fuelType,
            seats,

            image: req.file.path
        });

        res.json({
            message: 'Car added successfully',
            car
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

const getCars = async (req, res) => {

    try {

        const cars = await Car.find();

        res.json(cars);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

const deleteCar = async (req, res) => {

    try {

        const car = await Car.findById(req.params.id);

        if (!car) {

            return res.status(404).json({
                message: 'Car not found'
            });
        }

        await car.deleteOne();

        res.json({
            message: 'Car deleted successfully'
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

const updateCar = async (req, res) => {

    try {

        const {
            name,
            brand,
            pricePerDay,
            fuelType,
            seats
        } = req.body;

        const car = await Car.findById(req.params.id);

        if (!car) {

            return res.status(404).json({
                message: 'Car not found'
            });
        }

        car.name = name;
        car.brand = brand;
        car.pricePerDay = pricePerDay;
        car.fuelType = fuelType;
        car.seats = seats;

        if (req.file) {

            car.image = req.file.path;
        }

        await car.save();

        res.json({
            message: 'Car updated successfully',
            car
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getCars,
    addCar,
    deleteCar,
    updateCar
};