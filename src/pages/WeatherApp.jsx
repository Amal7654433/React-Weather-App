import React, { useState } from "react";
import axios from "axios";

const WeatherApp = () => {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    const KEY = import.meta.env.VITE_WEATHER_API_KEY

    const fetchWeather = async () => {

        if (!city) return;
        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY}&units=metric`;

        try {
            const response = await axios.get(URL);
            setWeather(response.data);
            setError(null);
        } catch (err) {
            setError("City not found. Please enter a valid city.");
            setWeather(null);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-5 text-white">
            <h1 className="text-3xl font-bold mb-5">Weather App</h1>
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-gray-800">
                <input
                    type="text"
                    placeholder="Enter city name"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button
                    className="w-full mt-3 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                    onClick={fetchWeather}
                >
                    Get Weather
                </button>
                {error && <p className="text-red-500 mt-3">{error}</p>}
                {weather && (
                    <div className="mt-5 text-center">
                        <h2 className="text-xl font-semibold">{weather.name}, {weather.sys.country}</h2>
                        <p className="text-4xl font-bold">{weather.main.temp}°C</p>
                        <p className="text-lg capitalize">{weather.weather[0].description}</p>
                        <div className="flex justify-between mt-4">
                            <p>Humidity: {weather.main.humidity}%</p>
                            <p>Wind: {weather.wind.speed} m/s</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WeatherApp;
