import React, { useRef } from "react";
import { useState, useImperativeHandle, forwardRef, useContext } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions} from "@mui/material";
import { Button } from "@mui/material"
import UserRow from "./UserRow";
import { context, dispatch } from "../../App"






const Modal = (props, ref) => {
    const [showModal, setshowModal] = useState(false);

    const Contents = useContext(context)
    const Actions = useContext(dispatch)

    console.log("Data: ", Contents.current.dataRef.current)

    useImperativeHandle(ref, () => ({
        setshowModal,
    }));

    return (
        <>
            {/* MODAL */}
            <Dialog open={showModal} onClose={() => { setshowModal(!showModal) }}>
                <DialogContent>        
                    <UserRow user={Contents.current.dataRef.current} setshowModal={setshowModal}/>
                </DialogContent>
            </Dialog>
        </>
    )
};

export default forwardRef(Modal); 