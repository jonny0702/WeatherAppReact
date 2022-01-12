import React, {useState} from 'react'
//React-Router
import { Link } from 'react-router-dom';
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
    const {handleDisplay, isOpen, addressName} = props
    // console.log(isOpen)
    return (
        <div className='Header-container'>
        <Link to='/location'>
            <IconButton aria-label='add' onClick={handleDisplay}>
                <AddIcon
                    sx={{color:grey[50]}}
                />
            </IconButton>
        </Link>
            <Location handleDisplay={handleDisplay} isOpen={isOpen} addressName={addressName}/>
        </div>
    )
}
