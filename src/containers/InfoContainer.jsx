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
          @media (min-height: 320px) {
            .infoContainer__container {
              transform: translateY(13%);
            }
            .infoContainer__container--open {
              transform: translateY(-50.5%);
            }
          }
          @media (min-height: 500px) {
            .infoContainer__container {
              transform: translateY(44%);
            }
            .infoContainer__container--open {
              transform: translateY(-38.5%);
            }
          }
          @media (min-height: 530px) {
            .infoContainer__container {
              transform: translateY(46%);
            }
            .infoContainer__container--open {
              transform: translateY(-38.5%);
            }
          }
          @media (min-height: 560px) {
            .infoContainer__container {
              transform: translateY(50%);
            }
            .infoContainer__container--open {
              transform: translateY(-37.5%);
            }
          }
          @media (min-height: 580px) {
            .infoContainer__container {
              transform: translateY(52.5%);
            }
            .infoContainer__container--open {
              transform: translateY(-36.5%);
            }
          }
          @media (min-height: 600px) {
            .infoContainer__container {
              transform: translateY(53.5%);
            }
            .infoContainer__container--open {
              transform: translateY(-34.5%);
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
          @media (min-height: 660px) {
            .infoContainer__container {
              transform: translateY(58.5%);
            }
            .infoContainer__container--open {
              transform: translateY(-30.5%);
            }
          }
          @media (min-height: 690px) {
            .infoContainer__container {
              transform: translateY(61.5%);
            }
            .infoContainer__container--open {
              transform: translateY(-30.5%);
            }
          }
          @media (min-height: 700px) {
            .infoContainer__container {
              transform: translateY(62.5%);
            }
            .infoContainer__container--open {
              transform: translateY(-28.5%);
            }
          }
          @media (min-height: 750px) {
            .infoContainer__container {
              transform: translateY(65.5%);
            }
            .infoContainer__container--open {
              transform: translateY(-26.5%);
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
          @media (min-height: 830px) {
            .infoContainer__container {
              transform: translateY(16.5%);
            }
            .infoContainer__container--open {
              transform: translateY(-77%);
            }
          }
          @media (min-height: 890px) {
            .infoContainer__container {
              transform: translateY(24%);
            }
            .infoContainer__container--open {
              transform: translateY(-68%);
            }
          }
          @media (min-height: 900px) {
            .infoContainer__container {
              transform: translateY(25%);
            }
            .infoContainer__container--open {
              transform: translateY(-68%);
            }
          }

          @media (min-height: 950px) {
            .infoContainer__container {
              transform: translateY(30%);
            }
            .infoContainer__container--open {
              transform: translateY(-65%);
            }
          }
        `}
      </style>
    </>
  );
};

export default InfoContainer;
