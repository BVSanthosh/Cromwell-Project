import React from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Provider } from 'react-redux';

import './App.css';

import store from './redux/store';
import AuthPage from './components/AuthPage/AuthPage'; 
import Signup from './components/AuthPage/Signup';  
import Login from './components/AuthPage/Login';  
import LandingPage from './components/LandingPage/LandingPage';  
import StorePage from './components/StorePage/StorePage';  

axios.defaults.withCredentials = true;

/**
 * Root Component
 * Imports all the components of the application and provides routing over these components
 */
function App() {
  return (
    <Provider store={store}> {/*mounts the redux store so that it is globally accessbible */}
        <Router>
            <Routes>  {/*specifies a route for each component*/}
              <Route path="/" element={<AuthPage />}/> 
              <Route path="/signup" element={<Signup />}/> 
              <Route path="/login" element={<Login />}/> 
              <Route path="/landing" element={<LandingPage />}/> 
              <Route path="/store" element={<StorePage />}/> 
            </Routes>
        </Router>
    </Provider>
  );
}

export default App;