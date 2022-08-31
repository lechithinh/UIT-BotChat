import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useImperativeHandle, forwardRef,useState } from 'react';
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Noti = (props, ref) => {
    const [showNoti, setshowNoti] = useState(false);
    const [message, setMessage] = useState("Xin hãy lại gần hơn!")
    const vertical = 'top'
    const horizontal = 'center'

    useImperativeHandle(ref, () => ({
        setshowNoti,
        setMessage,
    }));
    

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setshowNoti(false);
    };

    return (
        <Stack  sx={{ width: '100%' }}>
            <Snackbar anchorOrigin={{ vertical, horizontal }}  open={showNoti} autoHideDuration={1000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>

        </Stack>
    );
}

export default forwardRef(Noti);