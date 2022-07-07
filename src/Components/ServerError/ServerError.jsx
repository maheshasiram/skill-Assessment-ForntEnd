
import React, { useEffect } from "react";
import image from '../Helpers/Images/animated-computer-image-0096.gif';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";

function ServerError() {

    const { health } = useSelector(state => state);
    const navigate = useNavigate();

    useEffect(() => {
        health != null && health.status === 200 && navigate('/');
    }, [health])

    return (
        <div style={{ display: 'inline-grid' }}>
            <img alt="Server error" src={image} />
            <span>Ooops Server Error...!</span>
        </div>
    )
}

export default ServerError;