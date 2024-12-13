const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const Pricing = require('./src/models/Pricing'); // Import the Pricing model

// Load environment variables
require('dotenv').config();

// MongoDB connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

// Seed data from CSV
const seedData = async () => {
    const filePath = path.join(__dirname, 'data', 'pricing.csv');

    if (!fs.existsSync(filePath)) {
        console.error('CSV file not found:', filePath);
        process.exit(1);
    }

    const pricingData = [];

    // Parse CSV file
    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
            pricingData.push({
                country: row["﻿Country"],
                city: row.City,
                vehicleType: row['Vehicle Type'],
                amountAirportFees: parseFloat(row['Amount Airport Fees']),
                amountPerHour: parseFloat(row['Amount Per Hour']),
                amountPerKM: parseFloat(row['Amount Per KM']),
                baseAmount: parseFloat(row['Base Amount']),
                baseKms: parseInt(row['Base kms'], 10),
            });
        })
        .on('end', async () => {
            try {
                // Clear existing data
                await Pricing.deleteMany();
                console.log('Existing pricing data cleared');

                // Insert new data
                await Pricing.insertMany(pricingData);
                console.log('Pricing data seeded successfully');

                process.exit(0);
            } catch (error) {
                console.error('Error seeding data:', error);
                process.exit(1);
            }
        });
};

// Run seed script
const runSeeder = async () => {
    await connectDB();
    await seedData();
};

runSeeder();
