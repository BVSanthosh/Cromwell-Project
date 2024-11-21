
import axios from 'axios';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import './App.css';
import Auth from './components/AuthPage/AuthPage.jsx';  //imports the authentication page
import Signup from './components/AuthPage/Signup.jsx';  //imports the Signup component
import Login from './components/AuthPage/Login.jsx';  //imports the Login component
import LandingPage from './components/LandingPage/LandingPage.jsx';  //imports the landing page
import HomePage from './components/HomePage/HomePage.jsx';  //imports the Login component

axios.defaults.withCredentials = true;
function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Auth />}/> 
          <Route path="/signup" element={<Signup />}/> 
          <Route path="/login" element={<Login />}/> 
          <Route path="/landing-page" element={<LandingPage />}/> 
          <Route path="/home" element={<HomePage />}/> 
        </Routes>
    </Router>
  );
}

export default App;
