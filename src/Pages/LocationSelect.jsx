import React, {useState} from 'react'
import { Link } from 'react-router-dom';

//GoogleMaps-React
import PlacesAutocomplete,{geocodeByAddress, getLatLng} from 'react-places-autocomplete';
//Redux
import { connect } from 'react-redux';
import { useDispatch, getState } from 'react-redux';
import {changeCoordinates, fetchCoordinates} from '../actions/actions';


 function LocationSelect(props) {
     const {coordinates, changeCoordinates, fetchCoordinates} = props
     const dispatch = useDispatch()
    const [address, setAddress] = useState('');
    // const [latlng, setLatLng] = useState(coordinates)
    console.log(coordinates)

    const handleSelect = async (value)=>{
        try {
          const results = await geocodeByAddress(value);
          const latlng = await getLatLng(results[0]);
          setAddress(value);
          fetchCoordinates(latlng)
          dispatch({type: 'CHANGE_COORDINATES', payload:latlng})
        } catch (error) {
          console.error(error)
        }   
      }
    return (
    <div>
    <div className='Location-conatiner' >
      <div className='Location-header'>
          <h2 className='h2-container'>Choose your Location</h2>
      </div>
          <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
            {({getInputProps, suggestions, getSuggestionItemProps, loading })=>(
              <form >
                <input {...getInputProps({placeholder:'Type Adress'})} type='text' className='Select-container'  />
                <div>
                  {loading ? <span>...loading</span> : null}
                  {suggestions.map(suggestion => {
                    const styled = {
                      backgroundColor: suggestion.active ? '#00000' : '#222222' 
                    };
                    return(
                      <div key='1' {...getSuggestionItemProps(suggestion, {styled})}>
                        {suggestion.description}
                      </div>
                    )
                  })}
                </div>
              </form>

            )}
          </PlacesAutocomplete>
          {
              coordinates.lat !== null ?(
                <Link to='/main'>
                    <button type='submit'>Get Weather</button>
                </Link>    
              ):
              (
               <div></div>
              )
          }
          
      </div>
    </div>
    )
}
const MapStateToProps = state =>{
    return{
        coordinates: state.coordinates
    }
};
const MapDispatchToProps ={
    changeCoordinates,
    fetchCoordinates
}
export default connect(MapStateToProps, MapDispatchToProps)(LocationSelect)