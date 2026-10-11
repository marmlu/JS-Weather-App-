const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Weather API server is running!");
});

// Weather route
app.get("/api/weather", async (req, res) => {
  try {
    // Get the city name from the URL
    const city = req.query.city;

    // Check whether the user provided a city
    if (!city || city.trim() === "") {
      return res.status(400).json({
        error: "Please provide a city name.",
      });
    }

    // Get the API key from the .env file
    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "Weather API key is not configured.",
      });
    }

    // Request weather information from OpenWeather
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    const response = await fetch(weatherUrl);
    const data = await response.json();

    // Handle errors returned by OpenWeather
    if (!response.ok) {
      return res.status(response.status).json({
        error: data.message || "Unable to retrieve weather information.",
      });
    }

    // Send the weather information to the frontend
    res.json(data);
  } catch (error) {
    console.error("Weather request failed:", error.message);

    res.status(500).json({
      error: "An unexpected error occurred while retrieving weather data.",
    });
  }
});

// Start the server
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
