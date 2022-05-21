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
          @media (min-height: 580px) {
            .infoContainer__container {
              transform: translateY(52.5%);
            }
            .infoContainer__container--open {
              transform: translateY(-36.5%);
            }
          }
          @media (min-height: 640px) {
            .infoContainer__container {
              transform: translateY(56.5%);
            }
            .infoContainer__container--open {
              transform: translateY(-33.5%);
            }
          }
          @media (min-height: 800px) {
            .infoContainer__container {
              transform: translateY(13%);
            }
            .infoContainer__container--open {
              transform: translateY(-80%);
            }
          }
        `}
      </style>
    </>
  );
};

export default InfoContainer;
