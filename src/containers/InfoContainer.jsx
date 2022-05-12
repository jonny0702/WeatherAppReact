import React from 'react';

const InfoContainer = (props) => {
  const { isOpen, children } = props;
  console.log(isOpen);
  return (
    <div
      className="infoContainer__container"
      style={{
        transform: `translateY(${isOpen ? '-40%' : '55%'})`,
        background: `${isOpen ? 'rgba(0,0,0,.5)' : 'none'}`,
      }}
    >
      {children}
    </div>
  );
};

export default InfoContainer;