import React from 'react';
//styles
export default function Meteorology(props) {
  const { children } = props;

  return <div className="meteorology__container">{children}</div>;
}
