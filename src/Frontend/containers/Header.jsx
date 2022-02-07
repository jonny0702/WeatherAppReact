import React, {useState} from 'react'
//components
import Location from '../components/Location';
//styles
import './styles/Header.css';
//muiStyle templeates
import { IconButton } from '@mui/material';
import { grey } from '@mui/material/colors';
//icons
import AddIcon from '@mui/icons-material/Add'

export default function Header(props) {
    const {address} = props
    
    return (
        <div className='Header-container'>
            <IconButton aria-label='add'>
                <AddIcon
                    sx={{color:grey[50]}}
                />
            </IconButton>
            <Location>
                {
                    address && (
                    <div className='Location-container'>
                        <h2 className='location-title'>{address}</h2>
                    </div>
                    )
                }
            </Location>
        </div>
    )
}
