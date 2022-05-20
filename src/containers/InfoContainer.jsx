import React from 'react';

const InfoContainer = (props) => {
  const { isOpen, desktop, children } = props;
  return (
    <div
      className={`infoContainer__container`}
      style={
        desktop
          ? null
          : {
              transform: `translateY(${isOpen ? '-93.5%' : '-4%'})`,
              background: `${isOpen ? 'rgba(0,0,0,.5)' : 'none'}`,
            }
      }
    >
      {children}
    </div>
  );
};

export default InfoContainer;
