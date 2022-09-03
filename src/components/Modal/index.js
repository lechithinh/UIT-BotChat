//React
import React from "react";
import { useState, useImperativeHandle, forwardRef, useContext } from "react";

//Compoents
import { Dialog, DialogContent} from "@mui/material";

//Sub components itself
import UserRow from "./UserRow";

//Global contents and dispatch from App
import { context, dispatch } from "../../App"






const Modal = (props, ref) => {
    const [showModal, setshowModal] = useState(false);

    //Global contents and dispatch
    const Contents = useContext(context)
    const Actions = useContext(dispatch)

    // For App to use
    useImperativeHandle(ref, () => ({
        setshowModal,
    }));

    return (
        <>
            {/* Main Modal */}
            <Dialog open={showModal} onClose={() => { setshowModal(!showModal) }}>

                {/* Content Modal */}
                <DialogContent>        
                    <UserRow user={Contents.current.dataRef.current} setshowModal={setshowModal}/>
                </DialogContent>

            </Dialog>
        </>
    )
};

export default forwardRef(Modal); 