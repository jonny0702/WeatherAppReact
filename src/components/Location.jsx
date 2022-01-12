import React from 'react';
//styles
import './styles/location.css';

export default function Location(props) {
    const {handleDisplay, addressName} = props

    return (
        <>
            <div className='Location-container' onClick={handleDisplay}>
                <h2 className='location-title'>{addressName}</h2>
            </div>
        </>
    )
}
