import React from 'react';
//components
import SunriseSvg from './SunriseSvg'
//style
import './styles/SunriseSunset.css';
import moment from 'moment';

export default function SunriseSunset(props) {
  const {sunrise, sunset} = props
  return (
    <div className='SunriseSunset-container'>
      <SunriseSvg sunrise={sunrise} sunset={sunset}/>
      <div className='SunriseSunset_data-container'>
        <span>sunrise {moment.unix(sunrise).format('h:mm')}</span>
        <span>sunset {moment.unix(sunset).format('h:mm')}</span>
      </div>
    </div>
  );
}
