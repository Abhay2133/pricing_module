const axios = require('axios');

exports.getDistance = async (origin, destination) => {
    const API_KEY = process.env.GOOGLE_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${API_KEY}`;

    const response = await axios.get(url);
    const distance = (response.data.rows?.at(0)?.elements?.at(0)?.distance?.value / 1000) || 0; // km

    return distance;
};
