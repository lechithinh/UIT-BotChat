// React
import React from "react";


//Components
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Fab from '@mui/material/Fab';

const BackButton = () => {
    return(
        <>
            <Fab variant="extended" color="primary" sx={{ position: "absolute", top: "30px", left: "20px", fontSize: "1.8rem" }} href="http://map.mmlab.uit.edu.vn">
                <ArrowBackIosNewIcon sx={{ mr: 1 }} />
                Quay lại
            </Fab>
        </>
    )
};

export default BackButton;