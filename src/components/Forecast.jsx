import React from 'react';

export default function Forecast(props) {
  const { children } = props;
  return <div className="forecast-container">{children}</div>;
}
