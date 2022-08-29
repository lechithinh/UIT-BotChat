import React from "react";
import { useState, useImperativeHandle, forwardRef } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions} from "@mui/material";
import { Button } from "@mui/material"
import UserRow from "./UserRow";


const API = [
    {
        "name": "Lê Chí Thịnh",
        "gmail": "lechithinh.developer@gmail.com",
        "sim": 78,
        "MSSV": 21522634,
        "picture": "https://previews.123rf.com/images/rido/rido1204/rido120400047/13283722-happy-smiling-guy-showing-thumb-up-hand-sign-isolated-on-white-background.jpg",
        "subject1": "Cơ sở dữ liệu",
        "time1": "13h30 - 15h30",
        "room1": "B201",
        "subject2": "Toán rời rạc",
        "time2": "13h30 - 17h30",
        "room2": "B201",
    },

]




const Modal = (props, ref) => {
    const [showModal, setshowModal] = useState(false);


    useImperativeHandle(ref, () => ({
        setshowModal,
    }));

    return (
        <>
            <Dialog open={showModal} onClose={() => { setshowModal(!showModal) }}>
                <DialogTitle>
                    Thông tin thời khóa biểu: 
                </DialogTitle>
                <DialogContent>        
                    {API.map((user, index) => (
                        <UserRow key={index}  user={user}/>
                    ))}
                </DialogContent>

            </Dialog>
        </>
    )
};

export default forwardRef(Modal); 