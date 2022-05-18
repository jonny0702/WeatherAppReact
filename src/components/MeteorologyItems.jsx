import React from 'react';

const MeteorologyItems = (props) => {
  const { title, info, renderIcon, description, AqiCard, renderStatusBar } =
    props;
  return (
    <div
      className="MetorolgyItems__card"
      style={AqiCard ? { width: '90%' } : { width: '16rem' }}
    >
      <div className="data-info__container">
        <div>
          <span>{renderIcon && renderIcon()}</span>
          <span className="data-info__title">{title}</span>
        </div>
        <span className="data-info">{info}</span>
        {description && (
          <>
            <span className="data-description">{description}</span>
          </>
        )}
        {AqiCard && renderStatusBar && renderStatusBar()}
      </div>
    </div>
  );
};

export default MeteorologyItems;
