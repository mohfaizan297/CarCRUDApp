const Car = require('../models/Car');

exports.createCar = async (req, res) => {
    const { name, manufacturingYear, price } = req.body;
    if(!name || !manufacturingYear || !price)
    {
        return res.status(400).json({success: false, message: "All fields are required"})
    }
    if (isNaN(price) || price <= 0) {
        return res.status(400).json({ success: false, message: "Price must be a positive number" });
    }
    try {
        const car = new Car({ name, manufacturingYear, price });
        await car.save();
        res.status(201).json(car);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.getCars = async (req, res) => {
    try {
        const cars = await Car.find();
        if (cars.length === 0) {
            return res.status(404).json({ success: false, message: 'No cars found' });
        }
        res.status(200).json(cars);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.updateCar = async (req, res) => {
    const { id } = req.params;
    const { name, manufacturingYear, price } = req.body;

    if (!name || !manufacturingYear || !price) {
        return res.status(400).json({ success: false, message: 'Please provide all required fields: name, manufacturingYear, and price' });
    }

    try {
        const car = await Car.findById(id);
        if (!car) {
            return res.status(404).json({ success: false, message: 'Car not found' });
        }

        const updatedCar = await Car.findByIdAndUpdate(id, { name, manufacturingYear, price }, { new: true });
        res.status(200).json(updatedCar);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};


exports.deleteCar = async (req, res) => {
    const { id } = req.params;
    try {
        const car = await Car.findById(id);
        if (!car) {
            return res.status(404).json({ msg: 'Car not found' });
        }
        await Car.findByIdAndDelete(id);
        res.json({ msg: 'Car deleted' });
    } catch (err) {
        res.status(200).status(500).send('Server Error');
    }
};

