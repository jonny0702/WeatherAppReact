import React from 'react';
//component
import WeatherState from '../components/WeatherState';
import Forecast from '../components/Forecast';
import Meteorology from '../components/Meteorology';
import InfoContainer from './InfoContainer';
import ModelConatiner from './ModelConatiner';
import MeteorologyItems from '../components/MeteorologyItems';
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
import { red } from '@mui/material/colors';
import { teal } from '@mui/material/colors';
import { amber } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
//icons mui
import WavesIcon from '@mui/icons-material/Waves';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import UmbrellaIcon from '@mui/icons-material/Umbrella';
import AirIcon from '@mui/icons-material/Air';
import SpeedIcon from '@mui/icons-material/Speed';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import WaterIcon from '@mui/icons-material/Water';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
//dependecies
import moment from 'moment';
// import { a } from '@react-spring/web';
// import { useDrag } from '@use-gesture/react';
// import { a, useSpring, config } from '@react-spring/web';

export default function Main() {
  //API
  const API_KEY = process.env.API_KEY;
  const API_WEATHER = process.env.API_WEATHER;
  const API_FORECAST = process.env.API_FORECAST;
  const API_AIR = process.env.API_AIR;

  //Colors Mui
  const theme = createTheme({
    palette: {
      good: { main: teal[500] },
      fair: { main: amber[500] },
      moderate: { main: amber[600] },
      poor: { main: red[400] },
      veryPoor: { main: red[700] },
    },
  });
  //States
  const [dataWeather, setDataWeather] = useState({});
  const [dataForecast, setDataForecast] = useState([]);
  const [localAddress, setLocalAddress] = useState('');
  const [open, setOpen] = useState(false);
  const [AQI, setAQI] = useState(0);
  const [progress, setProgress] = useState({
    percentage: 0,
    color: 'good',
    status: 'Low Healt Risk',
  });
  const [uviStat, setUviStat] = useState({
    progress: 0,
    color: 'good',
    status: 'Low',
  });
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  //-------//

  const hasWeather = Object.values(dataWeather).length > 0;
  const hasForecast = Object.values(dataForecast).length > 0;
  const hasAqi = AQI != 0;
  //Heat Stress Formula
  let op = 0;
  const THI = (temp, rh) => {
    op = 0.8 * temp + rh * (temp - 14.4) + 46.4;
    if (72 >= op && op <= 79)
      return `THI= ${parseInt(op)} so the Heat Stress is Mild`;
    if (80 >= op && op <= 89)
      return `THI= ${parseInt(op)} so the Heat Stress is Moderate`;
    if (90 >= op)
      return `THI= ${parseInt(
        op
      )} so the Heat Stress is Severe You Are Dead XD`;
  };

  //---//
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
  //Api pollution
  const getAirPolutionApi = async () => {
    try {
      await window.navigator.geolocation.getCurrentPosition(
        savePositionToState
      );
      const responseAirApi = await fetch(`
        ${API_AIR}?lat=${lat}&lon=${lng}&appid=${API_KEY}
      `);
      const AQI = await responseAirApi.json();
      setAQI(AQI.list[0].main.aqi);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpen = () => {
    setOpen(!open);
  };
  //Hooks Later
  const handleProgressAir = (Aqi) => {
    switch (Aqi) {
      case 1:
        setProgress({ ...progress, percentage: 20 });
        break;
      case 2:
        setProgress({
          ...progress,
          percentage: 40,
          color: 'fair',
          status: 'Moderate Healt Risk',
        });
        break;
      case 3:
        setProgress({
          ...progress,
          percentage: 60,
          color: 'moderate',
        });
        break;
      case 4:
        setProgress({
          ...progress,
          percentage: 80,
          color: 'poor',
          status: 'High Healt Risk',
        });
        break;
      case 5:
        setProgress({
          ...progress,
          percentage: 100,
          color: 'veryPoor',
          status: 'Very High Healt Risk',
        });
        break;
    }
  };
  const handleUviStatus = (uvi) => {
    if (uvi <= 2) return setUviStat({ ...uviStat, progress: 20 });
    if (3 <= uvi && uvi <= 5)
      return setUviStat({
        ...uviStat,
        progress: 40,
        color: 'fair',
        status: 'Moderate',
      });
    if (6 <= uvi && uvi <= 8)
      return setUviStat({
        ...uviStat,
        progress: 60,
        color: 'moderate',
        status: 'High',
      });
    if (8 <= uvi && uvi <= 10)
      return setUviStat({
        ...uviStat,
        progress: 80,
        color: 'poor',
        status: 'Very High',
      });
    if (11 >= uvi)
      return setUviStat({
        ...uviStat,
        progress: 100,
        color: 'veryPoor',
        status: 'Extreme',
      });
  };

  useEffect(() => {
    getWeatherData();
    getForecastData();
    getAirPolutionApi();
    return () => {
      dataWeather, dataForecast;
    };
  }, [lat, lng]);

  useEffect(() => {
    handleProgressAir(AQI);
    hasForecast && handleUviStatus(Math.round(dataForecast[0].uvi));
    return () => {
      handleProgressAir, handleUviStatus;
    };
  }, [AQI, dataForecast]);
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
            src="https://www.nlspacecampus.eu/cache/3/1920x1080/mob-shutterstock-481251031-20210610135721_1920x1080.jpg"
            className="background_photo"
          />
        </div>
      )}
      {
        <WeatherState isOpen={open}>
          {hasWeather && hasAqi && (
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
                <WavesIcon sx={{ color: grey[50] }} fontSize="large" />
                {AQI} AQI
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
                    <span className="forecast-day">
                      {moment.unix(forecast.dt).format('ddd')}
                    </span>
                    <div className="img-container">
                      <img
                        src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
                        alt={forecast.weather[0].description}
                      />
                    </div>
                    <span className="forecast-temperature">
                      {Math.round(forecast.temp.day)}°C
                    </span>
                  </div>
                );
              })}
            </ul>
          )}
        </Forecast>
        <Meteorology
          renderCards={() =>
            hasWeather &&
            hasForecast && (
              <>
                <MeteorologyItems
                  renderIcon={() => (
                    <WavesIcon sx={{ color: grey[700] }} fontSize="medium" />
                  )}
                  title="Air Quality"
                  info={`${AQI}-${progress.status}`}
                  AqiCard
                  renderStatusBar={() => (
                    <>
                      <Box>
                        <ThemeProvider theme={theme}>
                          <LinearProgress
                            color={progress.color}
                            variant="determinate"
                            value={progress.percentage}
                          />
                        </ThemeProvider>
                      </Box>
                    </>
                  )}
                />
                <MeteorologyItems
                  renderIcon={() => (
                    <WbSunnyIcon sx={{ color: grey[700] }} fontSize="medium" />
                  )}
                  title="UVI"
                  info={`${Math.round(dataForecast[0].uvi)} ${uviStat.status}`}
                  AqiCard
                  renderStatusBar={() => (
                    <>
                      <Box>
                        <ThemeProvider theme={theme}>
                          <LinearProgress
                            color={uviStat.color}
                            variant="determinate"
                            value={uviStat.progress}
                          />
                        </ThemeProvider>
                      </Box>
                    </>
                  )}
                />
                <MeteorologyItems
                  renderIcon={() => (
                    <UmbrellaIcon sx={{ color: grey[700] }} fontSize="medium" />
                  )}
                  title="Rainfall"
                  info={`${dataForecast[0].rain} mm in last hour`}
                />
                <MeteorologyItems
                  renderIcon={() => (
                    <ThermostatIcon
                      sx={{ color: grey[700] }}
                      fontSize="medium"
                    />
                  )}
                  title="Thermal Sensation"
                  info={`${Math.round(dataWeather.main.feels_like)} °C`}
                  description={`${
                    dataWeather.main.temp < dataWeather.main.feels_like
                      ? 'More warm than the actual temperature'
                      : 'More cold than the actual temperature'
                  }`}
                />
                <MeteorologyItems
                  renderIcon={() => (
                    <VisibilityIcon
                      sx={{ color: grey[700] }}
                      fontSize="medium"
                    />
                  )}
                  title="Visibility"
                  info={`${dataWeather.visibility / 1000} Km`}
                  description={`
                    ${
                      dataWeather.visibility / 1000 <= 4
                        ? 'Haze visibility'
                        : 'Clear visibility'
                    }
                  `}
                />
                <MeteorologyItems
                  renderIcon={() => (
                    <WaterIcon sx={{ color: grey[700] }} fontSize="medium" />
                  )}
                  title="Humiditiy"
                  info={`${dataWeather.main.humidity}%`}
                  description={`
                    ${THI(
                      Math.round(dataWeather.main.temp),
                      dataWeather.main.humidity / 100
                    )}
                  `}
                />
                <MeteorologyItems
                  renderIcon={() => (
                    <SpeedIcon sx={{ color: grey[700] }} fontSize="medium" />
                  )}
                  title="Presure"
                  info={`${dataWeather.main.pressure} mbar`}
                  description={`${
                    dataWeather.main.pressure <= 300 &&
                    dataWeather.main.pressure <= 500
                      ? 'The Atmospheric pressure are low, you are away to the coast'
                      : 'The Atmospheric pressure are high, you are close to the coast '
                  }`}
                />
                <MeteorologyItems
                  renderIcon={() => (
                    <AirIcon sx={{ color: grey[700] }} fontSize="medium" />
                  )}
                  title="Wind Speed"
                  info={`${dataWeather.wind.speed} Km`}
                />
              </>
            )
          }
        />
      </InfoContainer>
    </div>
  );
}
