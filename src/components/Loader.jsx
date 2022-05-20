import React from 'react';
import '../styles/Loader.scss';

export default function Loader() {
  return (
    <div className="loader__container">
      <div className="lds-ring">
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}
