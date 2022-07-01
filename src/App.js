import './App.css';
import Home from './Components/Home/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useEffect } from 'react';
import axiosinstance from './axiosinstance';
import endPoints from './constants/endPoints';
import { useDispatch } from 'react-redux';
import { Types } from './constants/Types';
import './Components/Styles/Styles.scss';


function App() {
  /**
   * set useDispatch Hook as dispatch;
   */
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
      })
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
