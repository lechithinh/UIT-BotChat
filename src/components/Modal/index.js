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
        "picture": "https://previews.123rf.com/images/rido/rido1204/rido120400047/13283722-happy-smiling-guy-showing-thumb-up-hand-sign-isolated-on-white-background.jpg",
        "subject1": "Cơ sở dữ liệu",
        "time1": "13h30 - 15h30",
        "room1": "B201",
        "subject2": "Toán rời rạc",
        "time2": "13h30 - 17h30",
        "room2": "B201",
    },
    {
        "name": "Ngô Đức Hoàng Hiệp",
        "gmail": "lechithinh.developer@gmail.com",
        "picture": "https://previews.123rf.com/images/vgstudio/vgstudio1006/vgstudio100600027/7268969-portrait-of-happy-smiling-man-isolated-on-white.jpg",
        "sim": 78,
        "MSSV": 21522244,
        "subject1": "Toán cho KHTM",
        "time1": "8h30 - 9h30",
        "room1": "B201",
        "subject2": "Pháp luật đại cương",
        "time2": "10h30 - 11h30",
        "room2": "B201",
    },
    {
        "name": "Lê Văn A",
        "gmail": "lechithinh.developer@gmail.com",
        "picture": "https://pixlr.com/studio/template/6264364c-b8cc-4f4f-92d8-28c69a2b756w/thumbnail.webp",
        "sim": 78,
        "MSSV": 21523311,
        "subject1": "Nhập môn lập trình",
        "time1": "7h30 - 11h15",
        "room1": "B201",
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
                <DialogActions>
                    <Button variant="outlined" onClick={()=>{console.log("Đăng kí người mới")}}>Không có tôi</Button>
                </DialogActions>
            </Dialog>
        </>
    )
};

export default forwardRef(Modal); 