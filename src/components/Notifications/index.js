//React
import * as React from 'react';
import { useImperativeHandle, forwardRef, useState, useRef } from 'react';

//Components
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Noti = (props, ref) => {
    const [showNoti, setshowNoti] = useState(false);
    const [message, setMessage] = useState("Xin hãy lại gần hơn!")
    const TimeDurration = useRef(1000);

    // Position alert
    const vertical = 'top'
    const horizontal = 'center'



    // For App to use
    useImperativeHandle(ref, () => ({
        setshowNoti,
        setMessage: (message, time) => { setMessage(message); TimeDurration.current = time}
    }));
    

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setshowNoti(false);
    };

    return (
        <Stack  sx={{ width: '100%' }}>
            <Snackbar anchorOrigin={{ vertical, horizontal }} open={showNoti} autoHideDuration={TimeDurration.current} onClose={handleClose}>
                <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </Stack>
    );
}

export default forwardRef(Noti);