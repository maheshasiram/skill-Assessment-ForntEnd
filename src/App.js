import './App.css';
import Home from './Components/Home/Home';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import axiosinstance from './axiosinstance';
import endPoints from './constants/endPoints';
import { useDispatch } from 'react-redux';
import { Types } from './constants/Types';
import './Components/Styles/Styles.scss';
import ServerError from './Components/ServerError/ServerError';
import store from './store';
import SideNavBar from './Components/SideNavBar/SideNavBar';


function App() {

  // create dispatch to call api's in actions
  const dispatch = useDispatch();

  /**
   * to hit the url to check application health.
   */
  useEffect(() => {
    axiosinstance.get(endPoints.HEALTH)
      .then(response => {
        dispatch({ type: Types.HEALTH, payload: response });
      }).catch(err => {
        dispatch({ type: Types.HEALTH, payload: err });
      });

      // api call
        // dispatch(getUsers(sessionStorage.getItem('JWTtoken'), usersParams));


  }, []);


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<SideNavBar />} />
          <Route path='/servererror' element={<ServerError />} ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
