import React from 'react';

export default function WeatherState(props) {
  return <div className="weatherStatus-container">{props.children}</div>;
}
