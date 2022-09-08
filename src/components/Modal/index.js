//React
import React, { useRef } from "react";
import { useState, useImperativeHandle, forwardRef, useContext } from "react";

//Compoents
import { Dialog, DialogContent} from "@mui/material";
import CustomStepper from "../Stepper";
//Sub components itself
import UserRow from "./UserRow";

//Global contents and dispatch from App
import { context, dispatch } from "../../App"


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
    
    const [step, setStep] = useState(1);

    // For App to use
    useImperativeHandle(ref, () => ({
        setshowModal,
    }));

    const HandleClose = () => {
        Actions.setNotiMessage("Hãy đợi 3 giây để bắt đầu lại!", 3000);
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
                    maxWidth: "800px",
                },

                '& .MuiDialogContent-root': {width: "700px"},
                }} 
                open={showModal} onClose={HandleClose}> 


                {/* Content Modal */}
                <DialogContent sx={{ width: "570px", padding: "10px", '& .MuiDialogContent-root': {width: "500px"} }}>        
                    <UserRow  user={Contents.current.dataRef.current} setStep={setStep}/>
                </DialogContent>

            </Dialog>
        </>
    )
};

export default forwardRef(Modal); 