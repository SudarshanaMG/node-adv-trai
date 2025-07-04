require('dotenv').config()
const express = require('express')
const axios = require('axios')
const app = express();
app.use(express.json());

API_KEY = process.env.WEATHER_KEY;
PORT = process.env.PORT | 3000;

// const weatherData = {
//     Mumbai: { "city": "Mumbai", "temp": "32", "condition": "Sunny" },
//     London: { "city": "London", "temp": "23", "condition": "Cloudy" },
//     Tokyo: { "city": "Tokyo", "temp": "30", "condition": "Sunny" }
// }

// app.get('/weather', async (req, res) => {
//     const city = req.query.city;
//     if(!city){
//         return res.status(400).json({ error: "city query paramater is required"});
//     }
//     const data = weatherData[city];
//     if(data) res.json(data);
//     else res.status(404).json({ error: `weather data for ${city} not found`});
// });

app.get('/weather', async (req, res) => {
    const city = req.query.city;
    if(!city){
        return res.status(400).json({ error: "city query paramater is required"});
    }
    const url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}`;
    try{
        const response = await axios.get(url);
        const data = response.data;
        res.json({ city: data.location.name, temp: data.current.temp_c, condition: data.current.condition.text});
    }catch (error) {
        res.status(400).json({ error: error.response.data.error});
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost/${PORT}`);
});