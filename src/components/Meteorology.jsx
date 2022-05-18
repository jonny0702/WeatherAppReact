import React from 'react';
//styles
export default function Meteorology(props) {
  const { renderCards } = props;

  return (
    <div className="meteorology__container">{renderCards && renderCards()}</div>
  );
}
