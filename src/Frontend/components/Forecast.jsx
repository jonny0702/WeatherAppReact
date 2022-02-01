import React, {useState} from 'react';
//moment 
import moment from 'moment';

//styles
import './styles/Forcast.css'; 

export default function Forecast(props) {
    const {forecastData} = props;
    const hasForecast = Object.values(forecastData).length > 0

    return (
        <div className="forecast-container">
        {
            hasForecast && (
                <ul className='forecast-list'>
                {forecastData.map(forecast=>{
                    return(
                        <div className='forecast-days__container' key={forecast.dt}>
                            <div className='img-container'>
                                <img src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`} alt={forecast.weather[0].description}/>
                            </div>
                            <span className='forecast-day'> 
                             {moment.unix(forecast.dt).format('dddd')}.{forecast.weather[0].description}
                            </span>
                            <span className='forecast-temperature'>{forecast.temp.max}/{forecast.temp.min}</span>
                        </div>
                    )
                })}
            </ul>
            )
        }
        </div>
    )
};


