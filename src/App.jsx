import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';
import axios from 'axios';
import Louder from './components/Louder';

function App() {
  const [weather, setWeather] = useState({});
  const [isCelsius, setIsCelsius] = useState(true);
  const celsius = (weather.main?.temp - 273.15).toFixed(2);
  const fahrenheit = ((((celsius) * 9) / 5) + 32).toFixed(2)

  useEffect(() => {

    const success = pos => {
      const lat = pos.coords.latitude
      const lon = pos.coords.longitude
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=4aef6f2baeb9a9d80d7ae49cbd1376f6`)
        .then(res => setWeather(res.data));
    }

    navigator.geolocation.getCurrentPosition(success);

  }, [])

  console.log(weather)

  return (
    <div className="App">
      <div className="contenedor" >
        <div className="card">
          <div className="title">
            <h1><i className="fa-solid fa-cloud-bolt"></i> <i className="fa-solid fa-sun"></i> Weather App</h1>
            <h2><i className="fa-solid fa-city"></i> City: {weather.name}, {weather.sys?.country}</h2>
          </div>
          <div className="center">
            <div className="image">
              <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="icono temperatura" />
              <p><i className="fa-solid fa-temperature-low"></i> Temperature: {isCelsius ? celsius : fahrenheit}{" "}{isCelsius ? "°C" : "°F"}</p>
            </div>
            <div className="body">
              <p>Type of climate: {weather.weather?.[0].description}</p>
              <p><i className="fa-solid fa-wind"></i> Wind speed: {weather.wind?.speed} m/s</p>
              <p><i className="fa-solid fa-cloud"></i> Clouds: {weather.clouds?.all} %</p>
              <p><i className="fa-solid fa-compress"></i> Pressure: {weather.main?.pressure} hPa</p>
            </div>
          </div>
          <div className="button">
            <button onClick={() => setIsCelsius(!isCelsius)}><i className="fa-solid fa-temperature-empty"></i> Degrees {isCelsius ? "°C / °F" : "°F / °C"}</button>
          </div>
        </div>
      </div>
      {/* <Louder/> */}
      {/* <img src="./assets/img/icn_weather.gif" alt="" /> */}
    </div>
  )
}

export default App
