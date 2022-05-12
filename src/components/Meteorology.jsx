import React, { Children } from 'react';
import moment from 'moment';
//styles
import './styles/Meteorology.css';

export default function Meteorology(props) {
  const { children } = props;

  return <div className="meteorology__container">{children}</div>;
}
