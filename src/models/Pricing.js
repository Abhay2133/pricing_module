const mongoose = require('mongoose');

const pricingSchema = new mongoose.Schema({
    country: { type: String, required: true }, // Country code (e.g., GM)
    city: { type: String, required: true }, // City name (e.g., London)
    vehicleType: { type: String, required: true }, // Type of vehicle (e.g., Luxury, Economy)
    amountAirportFees: { type: Number, required: true }, // Fee for airport services
    amountPerHour: { type: Number, required: true }, // Cost per hour
    amountPerKM: { type: Number, required: true }, // Cost per kilometer
    baseAmount: { type: Number, required: true }, // Base fare
    baseKms: { type: Number, required: true }, // Base kilometers included
});

const Pricing = mongoose.model('Pricing', pricingSchema);

module.exports = Pricing