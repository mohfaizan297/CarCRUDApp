const express = require('express');
const router = express.Router();
const { createCar, getCars, updateCar, deleteCar } = require('../controllers/carController');
const { authMiddleware, isAuthenticated } = require('../middlewares/authMiddleware');


router.get('/',  getCars);
router.post('/',isAuthenticated,  createCar);
router.put('/:id', isAuthenticated, updateCar);
router.delete('/:id', isAuthenticated, deleteCar);

module.exports = router;
