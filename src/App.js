import React, { useState } from "react";
import "./App.css";

import notFoundImage from "./images/404.png";
import hazeImage from "./images/Haze.png";
import clearImage from "./images/clear.png";
import cloudImage from "./images/cloud.png";
import mistImage from "./images/mist.png";
import rainImage from "./images/rain.png";
import snowImage from "./images/snow.png";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({
    found: true,
    temperature: 0,
    description: "light Rain",
    humidity: "0%",
    windSpeed: "0km/h",
    main: "Clouds",
    errorMessage: "",
  });

  const getWeatherImage = (main) => {
    switch (main) {
      case "Clouds":
        return cloudImage;
      case "Clear":
        return clearImage;
      case "Rain":
        return rainImage;
      case "Mist":
        return mistImage;
      case "Snow":
        return snowImage;
      case "Haze":
        return hazeImage;
      default:
        return notFoundImage;
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      checkWeather();
    }
  };

  const checkWeather = async () => {
    const apiKey = "9373da8b820ec09ee3a9d9e0f8d11107";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.cod === 404) {
        setWeather({
          found: false,
          temperature: 0,
          description: "N/A",
          main: "N/A",
          humidity: "0%",
          windSpeed: "0km/h",
          errorMessage: "Location not found.",
        });
      } else if (data.cod !== 200) {
        setWeather({
          found: false,
          temperature: 0,
          description: "N/A",
          main: "N/A",
          humidity: "0%",
          windSpeed: "0km/h",
          errorMessage: "Failed to retrieve weather data.",
        });
      } 
      else {
        setWeather({
          found: true,
          temperature: Math.round(data.main.temp - 273.15),
          description: data.weather[0].description,
          main: data.weather[0].main,
          humidity: `${data.main.humidity}%`,
          windSpeed: `${data.wind.speed}km/h`,
          errorMessage: "",
        });
      }
    } catch (error) {
      setWeather({
        found: false,
        temperature: 0,
        description: "N/A",
        main: "N/A",
        humidity: "0%",
        windSpeed: "0km/h",
        errorMessage: "An error occurred while fetching weather data.",
      });
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="search"></div>
        <div className="search-box">
          <input
            type="text"
            placeholder="Enter your Location"
            className="input-box"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            onClick={checkWeather}
            className="fa-solid fa-magnifying-glass"
            id="search-button"
          ></button>
        </div>
      </div>

      {!weather.found && (
        <div className="location-not-found">
          <h1>Sorry, Location Not Found !!</h1>
          <img
            src={getWeatherImage(weather.main)}
            alt="weather"
            className="weather-img"
          />

          <div className="weather-box">
            <p className="temperature">
              {weather.temperature}
              <sup>°C</sup>
            </p>
            <p className="description">{weather.description}</p>
            <div className="weather-details">
              <div className="humidity">
                <i className="fa-sharp fa-solid fa-droplet"></i>
                <div className="text">
                  <span id="humidity">{weather.humidity}</span>
                  <p>Humidity</p>
                </div>
              </div>

              <div className="humidity">
                <i className="fa-sharp fa-solid fa-wind"></i>
                <div className="text">
                  <span id="wind-speed">{weather.windSpeed}</span>
                  <p>Wind Speed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {weather.found && (
        <div className="weather-body">
          <img
            src={getWeatherImage(weather.main)}
            alt="weather"
            className="weather-img"
          />
          <div className="weather-box">
            <p className="temperature">
              {weather.temperature}
              <sup>°C</sup>
            </p>
            <p className="description">{weather.description}</p>

            <div className="weather-details">
              <div className="humidity">
                <i className="fa-sharp fa-solid fa-droplet"></i>
                <div className="text">
                  <span id="humidity">{weather.humidity}</span>
                  <p>Humidity</p>
                </div>
              </div>

              <div className="humidity">
                <i className="fa-sharp fa-solid fa-wind"></i>
                <div className="text">
                  <span id="wind-speed">{weather.windSpeed}</span>
                  <p>Wind Speed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

