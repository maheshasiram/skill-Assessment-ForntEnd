import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormDialog from "../Dialogs/CustomeDialog";
import AboutUs from "../Helpers/AboutUs/AboutUs";
import Login from "../Login/Login";


function Home() {

    const [openLoginDialog, setopenLoginDialog] = useState(false);
    const { health } = useSelector(state => state);
    const navigate = useNavigate();

    useEffect(() => {
        health && health.status !== 200 && navigate('/servererror');
    },[health]);

    const onOpenLoginForm = () => {
        setopenLoginDialog(true);
    }

    const onCloseLoginForm = () => {
        setopenLoginDialog(false);
    }

    return (
            <div className="homeMianDiv">
                <div className="homeHeader">
                <h1> Welcome To Skill Assessment</h1>
                <Login />
                </div>
               
                <AboutUs />
            </div>

    )
}

export default Home;