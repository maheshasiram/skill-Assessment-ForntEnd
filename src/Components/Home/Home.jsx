import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AboutUs from "../Helpers/AboutUs/AboutUs";
import Login from "../Login/Login";

function Home() {
    const { health } = useSelector(state => state);
    const navigate = useNavigate();

    useEffect(() => {
        sessionStorage.clear();
        health && health.status !== 200 && navigate('/servererror');
    },[health]);


    return (
            <div className="homeMianDiv">
               {health && health.status === 200 && <div className="logInMainDiv">
                <div className="homeHeader">
                    <h1> Welcome To Skill Assessment</h1>
                <Login />
                </div>
                <AboutUs />
                </div>}
            </div>

    )
}

export default Home;