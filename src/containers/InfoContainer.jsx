import React from 'react';

const InfoContainer = (props) => {
  const { isOpen, children } = props;

  return (
    <>
      <div
        className={`${
          isOpen ? 'infoContainer__container--open' : 'infoContainer__container'
        }`}
      >
        {children}
      </div>
      <style jsx>
        {`
          @media (min-height: 667px) {
            .infoContainer__container {
              transform: translateY(60%);
            }
            .infoContainer__container--open {
              transform: translateY(-32.5%);
            }
          }
          @media (min-height: 800px) {
            .infoContainer__container {
              transform: translateY(17%);
            }
            .infoContainer__container--open {
              transform: translateY(-77.5%);
            }
          }
        `}
      </style>
    </>
  );
};

export default InfoContainer;
