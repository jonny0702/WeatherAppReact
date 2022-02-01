import React from 'react';
//styles
// import './styles/weatherImage.css';
// //mui
// import { Button } from '@mui/material';
// import { grey } from '@mui/material/colors';
// //icons mui
// import WavesIcon from '@mui/icons-material/Waves';

export default function WeatherState(props) {
  return (
    <div className="weatherStatus-container">
        {props.children}
    </div>
  );
}
// weatherData.map(temperature => temperature.main.temp)
