import axios from 'axios';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

import './App.css';

import AuthPage from './components/AuthPage/AuthPage.jsx';  //imports the authentication page
import Signup from './components/AuthPage/Signup.jsx';  //imports the Signup component
import Login from './components/AuthPage/Login.jsx';  //imports the Login component
import LandingPage from './components/LandingPage/LandingPage.jsx';  //imports the landing page
import StorePage from './components/StorePage/StorePage.jsx';  //imports the main store page

axios.defaults.withCredentials = true;
function App() {
  return (
    <Provider store={store}>
        <Router>
            <Routes>
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
