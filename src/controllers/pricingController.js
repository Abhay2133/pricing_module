const { getDistance } = require('../services/distanceService');
const Pricing = require('../models/Pricing');

exports.checkEmail = async (req, res, next) => {
    try {
        const { origin, destination, cityName, vehicleType } = req.body;

        if (!origin || !destination || !cityName || !vehicleType) {
            return res.status(400).json({ error: 'Invalid payload' });
        }

        const distance = await getDistance(origin, destination);

        if (distance > 1000) {
            return res.status(422).json({ error: 'Too far to offer ride' });
        }

        const cityPricing = await Pricing.findOne({ city: cityName, vehicleType });
        if (!cityPricing) {
            return res.status(404).json({ error: 'City or vehicle type not found' });
        }

        const { baseAmount } = cityPricing;
        const emailNeeded = distance > 30 || baseAmount < 50;

        res.json({ emailNeeded });
    } catch (error) {
        next(error);
    }
};
