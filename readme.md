# Pricing Module API

This project is a pricing module API built using Node.js and Express.js. It determines whether a user needs to provide an email to check the price based on certain conditions, such as distance, city-specific flags, and pricing rules.

---

## Features
- Calculates distances using the Google Geocoding API.
- Checks whether email registration is required based on:
  - Distance (> 30 km requires email).
  - Pricing amount (< €50 requires email).
  - City flags (specific cities require email).
- Returns appropriate HTTP error codes and messages for invalid payloads or unsupported scenarios.
- Provides clear responses with a boolean (`true`/`false`) indicating if an email is needed.
- Uses MongoDB for storing pricing data.

---

## Project Structure
```
pricing-module/
├── src/
│   ├── controllers/
│   │   └── pricingController.js
│   ├── models/
│   │   └── Pricing.js
│   ├── routes/
│   │   └── pricingRoutes.js
│   ├── services/
│   │   └── distanceService.js
│   ├── app.js
│   └── seed.js
├── tests/
│   └── pricing.test.js
├── .env
├── package.json
├── README.md
```

---

## Installation

### Prerequisites
- Node.js (>= 14.x)
- MongoDB instance (local or remote)
- Google Geocoding API key

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/pricing-module.git
   cd pricing-module
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the `.env` file with the following structure:
   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/pricingModule
   GOOGLE_API_KEY=your_google_geocoding_api_key
   ```

4. Seed the database with the provided CSV data:
   ```bash
   node src/seed.js
   ```

5. Start the server:
   ```bash
   npm start
   ```

6. Run tests:
   ```bash
   npm test
   ```

---

## Endpoints

### POST `/api/pricing/check-email`
**Description:** Determines if an email is required to check the price.

#### Request Body:
```json
{
  "origin": "<string>",
  "destination": "<string>",
  "cityName": "<string>",
  "vehicleType": "<string>"
}
```

#### Response:
- **Success (200):**
  ```json
  {
    "emailNeeded": true/false
  }
  ```

- **Error Responses:**
  - 400: Invalid payload
  - 404: City or vehicle type not found
  - 422: Too far to offer ride

---

## Testing
This project uses `supertest` and `assert` for testing. All test cases are located in `tests/pricing.test.js`.

To run the tests:
```bash
npm test
```

---

## Notes
- Ensure MongoDB is running before starting the server.
- Replace `your_google_geocoding_api_key` with a valid Google API key in `.env`.
- Customize the `src/seed.js` file if you wish to modify or extend the initial dataset.

---

## License
This project is licensed under the MIT License.

