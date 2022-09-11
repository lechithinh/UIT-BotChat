//React
import React, { useRef } from "react";
import { useState, useImperativeHandle, forwardRef, useContext } from "react";

//Compoents
import { Dialog, DialogContent , DialogTitle} from "@mui/material";
import CustomStepper from "../Stepper";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CancelIcon from '@mui/icons-material/Cancel';
//Sub components itself
import UserRow from "./UserRow";

//Global contents and dispatch from App
import { context, dispatch } from "../../App"
import PlayAudio from "../../utils/PlayAudio";

const steps = [
    "1. Nhận diện.",
    "2. Kiểm tra thông tin.",
    "3. Thời khóa biểu.",
];



const Modal = (props, ref) => {
    const [showModal, setshowModal] = useState(false);

    //Global contents and dispatch
    const Contents = useContext(context)
    const Actions = useContext(dispatch)
    console.log("Content: ", Contents.current.data.current);

    
    const [step, setStep] = useState(1);
    const [render, setRender] = useState(false);

    // For App to use
    useImperativeHandle(ref, () => ({
        setshowModal,
    }));

    const HandleClose = () => {
        PlayAudio("thankyou");
        Actions.ResetUser();
        Actions.setNotiMessage("Hãy đợi 3 giây để bắt đầu lại!", 3000);
        //Reset step
        setStep(1)
        //Reset data
        Actions.setNotiShow(true);
        setshowModal(!showModal)
        setTimeout(() => {
           
            Actions.setProcess(false);
            Actions.setNotiMessage("Xin hãy lại gần hơn!", 1000);
            Actions.setNotiShow(false);
        }, 4000);
        
        
    }

    return (
        <>
            {/* Main Modal */}
            {showModal && <CustomStepper steps={steps} activeStep={step} setActiveStep={setStep} />}

            <Dialog sx={{
                zIndex: 0,
                '& .MuiDialog-paper': {
                    borderRadius: '35px',
                    maxWidth: "900px",
                },

                '& .MuiDialogContent-root': {width: "750px"}, 
                
                '& .MuiListItem-root': {borderRadius: "40px"},

                '& .MuiTableContainer-root': { borderRadius: "20px" },

                '& .MuiTableHead-root': { backgroundColor: "#DEE9F3"}
                }} 
                open={showModal} onClose={HandleClose}> 
                
                <DialogTitle id="id">
                    <Box display="flex" alignItems="center">
                        <Box flexGrow={1} sx={{ mb: 2, position: "relative", mt: 2,ml: 4, '& .MuiTab-root': { fontSize: "23px", fontWeight: "700" } }}>
                            <Tabs value={0} centered>
                                <Tab label="Thông tin thời khóa biểu" />
                            </Tabs>
                        </Box>
                        <Box>
                            <IconButton sx={{'& .MuiSvgIcon-root': {fontSize: "3rem"}}}size="large" color='error' onClick={HandleClose}>
                                <CancelIcon />
                            </IconButton>
                           
                        </Box>
                    </Box>
                </DialogTitle>

                {/* Content Modal */}
                <DialogContent sx={{ width: "570px", padding: "40px", '& .MuiDialogContent-root': {width: "500px"} }}>        
                    {Contents.current.data.current.map((user, index) => (
                        <UserRow key={index} user={user} index={index} render={render} setRender={setRender} setStep={setStep}/>
                    ))}
                </DialogContent>

            </Dialog>
        </>
    )
};

export default forwardRef(Modal); 