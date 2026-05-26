const express = require('express');

const router = express.Router();

const {
    getCars,
    addCar,
    deleteCar,
    updateCar
} = require('../controllers/carController');

const protect = require('../middleware/authMiddleware');

const admin = require('../middleware/adminMiddleware');

const upload = require('../middleware/uploadMiddleware');

router.get('/', getCars);

router.post(
    '/',
    protect,
    admin,
    upload.single('image'),
    addCar
);

router.delete('/:id', protect, admin, deleteCar);

router.put('/:id', protect, admin, upload.single('image'), updateCar);

module.exports = router;