import React, { useEffect, useState } from "react";
import "./Weather.css";
import claericon from "../assets/clear.png";
import searchicon from "../assets/search.png";
import cloudicon from "../assets/cloud.png";
import humidityicon from "../assets/humidity.png";
import rainicon from "../assets/rain.png";
import snowicon from "../assets/snow.png";
import windicon from "../assets/wind.png";
import drizzleicon from "../assets/drizzle.png";

function Weather() {
  const [inputData, setInputData] = useState("");
  const [weatherData, setWeatherData] = useState(false);

  const allIcons = {
    "01d": claericon,
    "01n": claericon,
    "02d": cloudicon,
    "02n": cloudicon,
    "03d": cloudicon,
    "03n": cloudicon,
    "04d": drizzleicon,
    "04n": drizzleicon,
    "09d": rainicon,
    "09n": rainicon,
    "10d": rainicon,
    "10n": rainicon,
    "13d": snowicon,
    "13n": snowicon,
  };

  const search = async (city) => {
    try {
      if (city === "") {
        return alert("Enter City Name");
      }
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=97f70d58ef1fea16750006eca737a22a`;

      const response = await fetch(url);

      const data = await response.json();

      const icon = allIcons[data.weather[0].icon] || claericon;
      console.log(data);

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: data.main.temp,
        location: data.name,
        icon: icon,
      });
    } catch (e) {}
  };

  useEffect(() => {
    search("delhi");
  }, []);

  return (
    <div className="weather">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter City"
          onChange={(e) => setInputData(e.target.value)}
        />
        <img
          src={searchicon}
          className="search"
          onClick={() => search(inputData)}
        />
      </div>
      <div className="inner">
        <img src={weatherData.icon} className="clear-icons" />

        <p className="temperature">{weatherData.temperature}° c</p>
        <p className="location">{weatherData.location}</p>
      </div>
      <div className="weather-details">
        <div className="col1">
          <img src={humidityicon} />
          <p className="text">{weatherData.humidity} %</p>
          <span>Humidity</span>
        </div>
        <div className="col2">
          <img src={windicon} />
          <p className="text-col2">{weatherData.windSpeed} Km/h</p>
          <span>Wind Speed</span>
        </div>
      </div>
    </div>
  );
}

export default Weather;
