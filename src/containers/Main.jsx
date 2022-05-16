import React, { Suspense } from 'react';
//component
import WeatherState from '../components/WeatherState';
import Forecast from '../components/Forecast';
import Meteorology from '../components/Meteorology';
import InfoContainer from './InfoContainer';
import ModelConatiner from './ModelConatiner';
//style
import '../styles/Main.scss';
import '../styles/weatherState.scss';
import '../styles/Meteorology.scss';
import '../styles/Forcast.scss';
import '../styles/InfoContainer.scss';
import '../styles/ModelContainer.scss';
//Hooks
import { useState, useEffect } from 'react';
//mui
import { Button } from '@mui/material';
import { grey } from '@mui/material/colors';
//icons mui
import WavesIcon from '@mui/icons-material/Waves';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
//dependecies
import moment from 'moment';
// import { useDrag } from '@use-gesture/react';
// import { a, useSpring, config } from '@react-spring/web';

function Main() {
  //API
  const API_KEY = process.env.API_KEY;
  const API_WEATHER = process.env.API_WEATHER;
  const API_FORECAST = process.env.API_FORECAST;

  const [dataWeather, setDataWeather] = useState({});
  const [dataForecast, setDataForecast] = useState([]);
  const [localAddress, setLocalAddress] = useState('');
  const [open, setOpen] = useState(false);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  const hasWeather = Object.values(dataWeather).length > 0;
  const hasForecast = Object.values(dataForecast).length > 0;

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

  const handleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    getWeatherData();
    getForecastData();
    return () => {
      dataWeather, dataForecast;
    };
  }, [lat, lng]);

  return (
    <div className="App-container">
      {hasWeather && (
        <div
          className="img-background"
          style={{
            filter: `${open ? 'blur(2px)' : 'blur(0)'}`,
            transition: 'all ease-in 1s',
          }}
        >
          <img
            src="https://i.pinimg.com/originals/2f/d5/06/2fd5064bdc6123d004153c6a1d3ea8f7.jpg"
            className="background_photo"
          />
        </div>
      )}
      {
        <WeatherState isOpen={open}>
          {hasWeather && (
            <>
              <div className="location-container">
                <h5 className="location-title">{localAddress}</h5>
              </div>
              <h1 className="weather-temperature">
                {Math.round(dataWeather.main.temp)}ºC
              </h1>
              <span className="weather-status">
                {dataWeather.weather[0].description}
              </span>
              <div className="weather-ica">
                <Button
                  size="medium"
                  className="Button"
                  sx={{
                    color: grey[50],
                    borderColor: grey[50],
                    borderRadius: 3,
                    border: 1,
                  }}
                >
                  <WavesIcon sx={{ color: grey[50] }} fontSize="medium" />
                  {dataWeather.wind.deg} ICA
                </Button>
              </div>
            </>
          )}
        </WeatherState>
      }
      <div
        style={{
          filter: `${open ? 'blur(3px)' : 'blur(0)'}`,
          transition: 'all ease-in 1s',
        }}
      >
        <ModelConatiner />
      </div>
      <InfoContainer isOpen={open}>
        <div
          className="buttom__display--container"
          onClick={() => handleOpen()}
        >
          <Button
            // variant="outlined"
            size="medium"
            className="Button"
            sx={{
              color: grey[50],
              borderColor: grey[60],
              borderRadius: 3,
              border: 1,
            }}
          >
            <ExpandLessIcon sx={{ color: grey[50] }} fontSize="large" />
          </Button>
        </div>
        <Forecast>
          {hasForecast && (
            <ul className="forecast-list">
              {dataForecast.map((forecast) => {
                return (
                  <div className="forecast-days__container" key={forecast.dt}>
                    <div className="img-container">
                      <img
                        src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
                        alt={forecast.weather[0].description}
                      />
                    </div>
                    <span className="forecast-day">
                      {moment.unix(forecast.dt).format('dddd')}.
                      {forecast.weather[0].description}
                    </span>
                    <span className="forecast-temperature">
                      {forecast.temp.max}/{forecast.temp.min}
                    </span>
                  </div>
                );
              })}
            </ul>
          )}
        </Forecast>
        <Meteorology>
          {hasWeather && (
            <>
              <div className="gird-items">
                <span className="data-info__title">Clock</span>
                <br />
                <span className="data-info">
                  {moment().format('h:mm:ss a')}
                </span>
              </div>
              <div className="gird-items">
                <span className="data-info__title">Thermal sensation</span>
                <br />
                <span className="data-info">
                  {dataWeather.main.feels_like}ºC
                </span>
              </div>
              <div className="gird-items">
                <span className="data-info__title">max temperature</span>
                <br />
                <span className="data-info">{dataWeather.main.temp_max}ºC</span>
              </div>
              <div className="gird-items">
                <span className="data-info__title">min temperature</span>
                <br />
                <span className="data-info">{dataWeather.main.temp_min}ºC</span>
              </div>
              <div className="gird-items">
                <span className="data-info__title">Humidity</span>
                <br />
                <span className="data-info">{dataWeather.main.humidity}%</span>
              </div>
              <div className="gird-items">
                <span className="data-info__title">Presure</span>
                <br />
                <span className="data-info">
                  {dataWeather.main.pressure} mbar
                </span>
              </div>
              <div className="gird-items">
                <span className="data-info__title">Wind speed</span>
                <br />
                <span className="data-info">{dataWeather.wind.speed} Km/h</span>
              </div>
              {hasForecast && (
                <div className="gird-items">
                  <span className="data-info__title">UVI</span>
                  <br />
                  <span className="data-info">{dataForecast[0].uvi}</span>
                </div>
              )}
            </>
          )}
        </Meteorology>
      </InfoContainer>

      {/* <div className="footer">
        <p>Los datos Proporcionados son parte de: OpenWeather</p>
      </div> */}
    </div>
  );
}

export default Main;
