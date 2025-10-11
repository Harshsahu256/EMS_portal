// src/App.jsx

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import HomePage1 from './pages/Home/HomePage1';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
const App = () => {
    return (
        <BrowserRouter>
    
            <HomePage1 />
        </BrowserRouter>
    );
};

export default App;