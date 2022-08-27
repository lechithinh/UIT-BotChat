import React from "react";
import { useState, useImperativeHandle, forwardRef } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions} from "@mui/material";
import { Button } from "@mui/material"
import UserRow from "./UserRow";
import Schedule from "./Schedule";

const API = [
    {
        "name": "Lê Chí Thịnh",
        "gmail": "lechithinh.developer@gmail.com",
        "sim": 78,
        "MSSV": 21522634,
    },
    {
        "name": "Lê Chí Thịnh 2",
        "gmail": "lechithinh.developer@gmail.com",
        "sim": 78,
        "MSSV": 21522244,
    },
    {
        "name": "Lê Chí Thịnh 3",
        "gmail": "lechithinh.developer@gmail.com",
        "sim": 78,
        "MSSV": 21523311,
    },

]

const Subject = [
    {
        "subject": "Lập trình hướng đối tượng",
        "time": "13h30",
        "room": "B201",
    },
    {
        "subject": "Cấu trúc dữ liệu và giải thuật",
        "time": "8h00",
        "room": "C301",
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
                    Bạn có phải là?
                </DialogTitle>
                <DialogContent>        
                    {API.map((user, index) => (
                        <UserRow key={index}  user={user}/>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined">Đăng kí người mới</Button>
                </DialogActions>
            </Dialog>
        </>
    )
};

export default forwardRef(Modal); 