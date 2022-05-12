import React from 'react';

export default function WeatherState(props) {
  const { children, isOpen } = props;
  return (
    <div
      className="weatherStatus-container"
      style={{
        filter: `${isOpen ? 'blur(2px)' : 'blur(0)'}`,
      }}
    >
      {children}
    </div>
  );
}
