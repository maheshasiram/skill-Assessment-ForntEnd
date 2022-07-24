import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

function Loader() {
    const {isLoader} = useSelector(state=>state);
    return (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoader} >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

export default Loader;