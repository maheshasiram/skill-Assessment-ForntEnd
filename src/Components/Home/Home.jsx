import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import FormDialog from "../Dialogs/CustomeDialog";
import Login from "../Login/Login";


function Home() {

    const [openLoginDialog, setopenLoginDialog] = useState(false);
    const { health } = useSelector(state => state);
    const navigate = useNavigate();

    useEffect(() => {
        health && health.status == 200 && navigate('/servererror')
    }, [])

    const onOpenLoginForm = () => {
        setopenLoginDialog(true);
    }

    const onCloseLoginForm = () => {
        setopenLoginDialog(false);
    }

    return (
        <div className="homeMianDiv">
            <h1> Welcome To Skill Assessment</h1>
            <Login />

            {/* <FormDialog 
            onCloseDialog={onCloseLoginForm}
            openLoginDialog={openLoginDialog}
            /> */}

        </div>
    )
}

export default Home;