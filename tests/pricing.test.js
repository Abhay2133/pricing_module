const assert = require('assert');
const request = require('supertest');
const Pricing = require('../src/models/Pricing');
const app = require('../src/app'); // Assuming your Express app is exported from src/app.js
const test = require("node:test")

require('dotenv').config();

test.describe("Tests : Pricing Modules", () => {

    // Test cases
    test('should return true if email is needed (distance > 30km)', async () => {
        const response = await request(app)
            .post('/api/pricing/check-email')
            .send({
                origin: 'Kotdwara',
                destination: 'Haridwar',
                cityName: 'london',
                vehicleType: 'Economy'
            });

        assert.strictEqual(response.status, 200);
        assert.strictEqual(response.body.emailNeeded, true);
    });

    test('should return true if baseAmount < €50', async () => {
        const response = await request(app)
            .post('/api/pricing/check-email')
            .send({
                origin: 'Delhi',
                destination: 'Agra',
                cityName: 'london',
                vehicleType: 'Economy'
            });

        assert.strictEqual(response.status, 200);
        assert.strictEqual(response.body.emailNeeded, true);
    });

    test('should return false if conditions are not met', async () => {
        const response = await request(app)
            .post('/api/pricing/check-email')
            .send({
                origin: 'Kotdwara',
                destination: 'Najibabad',
                cityName: 'london',
                vehicleType: 'Luxury'
            });

        assert.strictEqual(response.status, 200);
        assert.strictEqual(response.body.emailNeeded, false);
    });

    test('should return error for invalid payload', async () => {
        const response = await request(app)
            .post('/api/pricing/check-email')
            .send({
                origin: 'Hyderabad',
                vehicleType: 'Economy'
            });

        assert.strictEqual(response.status, 400);
        assert.strictEqual(response.body.error, 'Invalid payload');
    });

    test('should return error if distance > 1000km', async () => {
        const response = await request(app)
            .post('/api/pricing/check-email')
            .send({
                origin: 'Delhi',
                destination: 'Chennai',
                cityName: 'london',
                vehicleType: 'Economy'
            });

        assert.strictEqual(response.status, 422);
        assert.strictEqual(response.body.error, 'Too far to offer ride');
    });

    test('should return error if city or vehicle type not found', async () => {
        const response = await request(app)
            .post('/api/pricing/check-email')
            .send({
                origin: 'Bangalore',
                destination: 'Bangolore',
                cityName: 'unknownCity',
                vehicleType: 'unknownVehicle'
            });

        assert.strictEqual(response.status, 404);
        assert.strictEqual(response.body.error, 'City or vehicle type not found');
    });

    test('should handle long distances correctly', async () => {
        const response = await request(app)
            .post('/api/pricing/check-email')
            .send({
                origin: 'Kotdwara',
                destination: 'Chennai',
                cityName: 'london',
                vehicleType: 'Economy'
            });

        assert.strictEqual(response.status, 422);
        assert.strictEqual(response.body.error, 'Too far to offer ride');
    });

    test('should return true for medium distance and low price', async () => {
        const response = await request(app)
            .post('/api/pricing/check-email')
            .send({
                origin: 'Dehradun',
                destination: 'Haridwar',
                cityName: 'london',
                vehicleType: 'Economy'
            });

        assert.strictEqual(response.status, 200);
        assert.strictEqual(response.body.emailNeeded, true);
    });

    test.after(() => process.exit(0));

})

