import React from 'react';
import moment from 'moment';
//styles
import './styles/Meteorology.css';

export default function Meteorology(props) {

  const { weatherData, uviData } = props;

  const hasWeatherMeteorology = Object.values(weatherData).length > 0;
  const hasUvi = Object.values(uviData).length > 0;
  return (
    <div className="meteorology__container">
      {hasWeatherMeteorology && (
        <>
          <div className="gird-items Clock">
            <span>Clock</span>
            <br/>
            <span>{moment().format('h:mm:ss a')}</span>
          </div>
          <div className="gird-items">
            <span className="data-info__title">Thermal sensation</span>
            <br />
            <span className="data-info">{weatherData.main.feels_like}ºC</span>
          </div>
          <div className="gird-items">
            <span className="data-info__title">max temperature</span>
            <br />
            <span className="data-info">{weatherData.main.temp_max}ºC</span>
          </div>
          <div className="gird-items">
            <span className="data-info__title">min temperature</span>
            <br />
            <span className="data-info">{weatherData.main.temp_min}ºC</span>
          </div>
          <div className="gird-items">
            <span className="data-info__title">Humidity</span>
            <br />
            <span className="data-info">{weatherData.main.humidity}%</span>
          </div>
          <div className="gird-items">
            <span className="data-info__title">Presure</span>
            <br />
            <span className="data-info">{weatherData.main.pressure} mbar</span>
          </div>
          <div className="gird-items">
            <span className="data-info__title">Wind speed</span>
            <br />
            <span className="data-info">{weatherData.wind.speed} Km/h</span>
          </div>
        </>
      )}
      {
        hasUvi && (
          <div className="gird-items">
            <span className="data-info__title">UVI</span>
            <br />
            <span className="data-info">{uviData[0].uvi}</span>
          </div>
        )
      }
    </div>
  );
}
