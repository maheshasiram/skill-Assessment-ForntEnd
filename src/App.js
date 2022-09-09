import './App.css';
import Home from './Components/Home/Home';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import React, { useEffect, useRef } from 'react';
import axiosinstance from './axiosinstance';
import endPoints from './constants/endPoints';
import { useDispatch } from 'react-redux';
import { Types } from './constants/Types';
import './Components/Styles/Styles.scss';
import ServerError from './Components/ServerError/ServerError';
import SideNavBar from './Components/SideNavBar/SideNavBar';
import PublicRoute from './Components/Routes/PublicRoute';
import PrivateRoute from './Components/Routes/PrivateRoute';
import NotFound from './Components/NotFound/NotFound';


function App() {
  // create dispatch to call api's in actions
  const dispatch = useDispatch();

  //useEffect will call twice in React-18 version so, we are using (callUseeffect) state to make call only once.
  const callUseeffect = useRef(true);
  
  /**
   * to hit the url to check application health.
   */
  useEffect(() => {
    if(callUseeffect.current){
      callUseeffect.current = false
      axiosinstance.get(endPoints.HEALTH)
      .then(response => {
        dispatch({ type: Types.HEALTH, payload: response });
      }).catch(err => {
        dispatch({ type: Types.HEALTH, payload: err });
      });
    }
  }, []);


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicRoute component={Home} /> } />
          <Route path="/admin" element={<PrivateRoute component={SideNavBar} /> } />
          <Route path='/servererror' element={<ServerError /> } /> 
          <Route path='*' element={ <NotFound /> }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
