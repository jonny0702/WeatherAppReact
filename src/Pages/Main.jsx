import React from 'react';
//component
import WeatherState from '../components/WeatherState';
import Forecast from '../components/Forecast';
import Meteorology from '../components/Meteorology';
//containers
import Header from '../containers/Header';
//style
import './App.css';
import '../components/styles/weatherImage.css';
//Hooks
import { useState, useEffect } from 'react';
// redux
import { connect } from 'react-redux';
import {changeCoordinates} from '../actions/actions';
// import { weatherForecast } from './actions/actions';
//mui
import { Button } from '@mui/material';
import { grey } from '@mui/material/colors';
//icons mui
import WavesIcon from '@mui/icons-material/Waves';


function Main(props) {
  const {coordinates} = props
  console.log(coordinates)
  //API
  const API_KEY = 'fb5b06c6b5435868cb173d77032e6846';
  const API_WEATHER = `https://api.openweathermap.org/data/2.5/weather`;
  const API_FORECAST = `https://api.openweathermap.org/data/2.5/onecall`;
  
  const [dataWeather, setDataWeather] = useState({});
  const [dataForecast, setDataForecast] = useState([]);


  const hasWeather = Object.values(dataWeather).length > 0;

  useEffect(() => { 
      getWeatherData()
      getForecastData()
      return {dataWeather, dataForecast}
  },[]);    

  // const handleDisplay = (event)=>{
  //     setOpen(!open)
  // }
  //   //style logic 
  // const styledRight = ()=>{
  //   return{
  //       right: open ? '0%' : '-100%'
  //   }
  // }

//Api Actual Weather
const getWeatherData = async ()=>{
    try {
      const responseWeather = await fetch(`${API_WEATHER}?lat=${coordinates.lat}&lon=${coordinates.lng}&units=metric&appid=${API_KEY}`);
      const data = await responseWeather.json();
      setDataWeather(data);
      // console.log(dataWeather)
      } catch (error) {
        console.error('API ERROR', error);
      }
}
// Api Forcast
const getForecastData = async()=>{
      try {
        const responseForecast = await fetch(`${API_FORECAST}?lat=${coordinates.lat}&lon=${coordinates.lng}&exclude=current,minutely,hourly,alerts&units=metric&appid=${API_KEY}`);
        const forecast = await responseForecast.json();
        setDataForecast(forecast.daily);
      } catch (error) {
        console.error(error);
      }
}
      
  return (
    <div className="App-container">
      <Header handleDisplay={handleDisplay} isOpen={open} />
      {
        <WeatherState>
          {hasWeather && (
            <>
              <h1 className="weather-temperature">{dataWeather.main.temp}ºC</h1>
              <span className="weather-status">{dataWeather.weather[0].description}</span>
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
      <Meteorology
        weatherData={dataWeather}
      />
      <div className="footer">
        <p>Los datos Proporcionados son parte de:</p>
      </div>
    </div>
  );
}
const MapStateToProps = (state) => {
  return {
    coordinates: state.coordinates,
  };
};
const MapDispatchToProps = {
  changeCoordinates,
};
export default connect(MapStateToProps, MapDispatchToProps)(Main);
