import React from 'react';
//styles
import './styles/Forcast.css';

export default function Forecast(props) {
  const { children } = props;
  return <div className="forecast-container">{children}</div>;
}
