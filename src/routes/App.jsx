import React from 'react';
import { BrowserRouter, Route, Routes  } from 'react-router-dom';
import Main from '../Pages/Main';
import LocationSelect from '../Pages/LocationSelect'

export default function App() {
    return (
        <BrowserRouter>
        <Routes>
            <Route exact path= '/' element={<LocationSelect/>} />
            <Route exact path='/main' element={<Main/>} />
        </Routes>
        </BrowserRouter>
    )
}
