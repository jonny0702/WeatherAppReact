import React from 'react';
//component
import WeatherState from '../components/WeatherState';
import Forecast from '../components/Forecast';
import Meteorology from '../components/Meteorology';
//containers
import Header from './Header';
//style
import './styles/App.css';
import '../components/styles/weatherImage.css';
//Hooks
import { useState, useEffect } from 'react';
//mui
import { Button } from '@mui/material';
import { grey } from '@mui/material/colors';
//icons mui
import WavesIcon from '@mui/icons-material/Waves';
function Main() {
  //API
  const API_KEY = process.env.API_KEY;
  const API_WEATHER = process.env.API_WEATHER;
  const API_FORECAST = process.env.API_FORECAST;

  const [dataWeather, setDataWeather] = useState({});
  const [dataForecast, setDataForecast] = useState([]);
  const [localAddress, setLocalAddress] = useState('');
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  const hasWeather = Object.values(dataWeather).length > 0;

  const savePositionToState = (position) => {
    setLat(position.coords.latitude);
    setLng(position.coords.longitude);
  };
  //Api Actual Weather
  const getWeatherData = async () => {
    try {
      await window.navigator.geolocation.getCurrentPosition(
        savePositionToState
      );
      const responseWeather = await fetch(
        `${API_WEATHER}?lat=${lat}&lon=${lng}&units=metric&appid=${API_KEY}`
      );
      const data = await responseWeather.json();
      setDataWeather(data);
      setLocalAddress(data.name);
    } catch (error) {
      console.error('API ERROR', error);
    }
  };
  // Api Forcast
  const getForecastData = async () => {
    try {
      await window.navigator.geolocation.getCurrentPosition(
        savePositionToState
      );
      const responseForecast = await fetch(
        `${API_FORECAST}?lat=${lat}&lon=${lng}&exclude=current,minutely,hourly,alerts&units=metric&appid=${API_KEY}`
      );
      const forecast = await responseForecast.json();
      setDataForecast(forecast.daily);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getWeatherData();
    getForecastData();
    return { dataWeather, dataForecast };
  }, [lat, lng]);
  return (
    <div className="App-container">
      {hasWeather && (
        <div className="img-background">
          <img
            src={`https://source.unsplash.com/1920x1080/?${dataWeather.weather[0].main}`}
            className="background_photo"
          />
        </div>
      )}
      <Header isOpen={open} address={localAddress} />
      {
        //data Components
        <WeatherState>
          {hasWeather && (
            <>
              <h1 className="weather-temperature">{dataWeather.main.temp}ºC</h1>
              <span className="weather-status">
                {dataWeather.weather[0].description}
              </span>
              <div className="weather-ica">
                <Button
                  variant="outlined"
                  size="small"
                  className="Button"
                  sx={{
                    color: grey[50],
                    borderColor: grey[50],
                    borderRadius: 3,
                    border: 1,
                  }}
                >
                  <WavesIcon sx={{ color: grey[50] }} fontSize="small" />
                  {dataWeather.wind.deg} ICA
                </Button>
              </div>
            </>
          )}
        </WeatherState>
      }
      <Forecast forecastData={dataForecast} />
      <Meteorology weatherData={dataWeather} uviData={dataForecast} />
      <div className="footer">
        <p>Los datos Proporcionados son parte de: OpenWeather</p>
      </div>
    </div>
  );
}

export default Main;
