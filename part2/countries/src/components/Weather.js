import { useState, useEffect } from "react";
import axios from "axios";

const api_key = process.env.REACT_APP_API_KEY
const api = `https://api.weatherapi.com/v1/current.json?key=${api_key}&aqi=no`

function Weather({ country }) {
  const [weather, setWeather] = useState({
    location: { name: "" },
    current: {
      temp_c: 0,
      condition: {
        icon: ""
      },
      wind_kph: 0,
    }
  })

  const hook = () => {
    axios
      .get(`${api}&q=${country}`)
      .then(response => {
        console.log('promise fulfilled')
        setWeather(response.data)
      })
  }
  useEffect(hook, [country])

  return (
    <>
      <h2>Weather in {weather.location.name}</h2>
      Temperature: {weather.current.temp_c} Celcius<br />
      <img alt="Weather icon" src={weather.current.condition.icon} /><br />
      Wind: {weather.current.wind_kph} m/s <br />

      Last updated: {weather.current.last_updated}
    </>
  )
}

export default Weather