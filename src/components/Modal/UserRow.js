//React
import React, { useState, useRef, useContext, useEffect, useReducer, forwardRef, useImperativeHandle } from "react";

//Libaries
import axios from "axios";

//Components
import { Box, Fab } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import { ListItem, ListItemAvatar, ListItemText, ListItemIcon } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Alert from '@mui/material/Alert';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
//Sub components
import TextEdit from "./Textedit";
import DaySchedule from "./DaySchedule";
import WeekSchedule from "./WeekSchedule"
import LessonCode from "./LessonCode";

//Utils
import GetNameById from "../../utils/GetNameById";
import PlayAudio from "../../utils/PlayAudio";

//Global contents and dispatch from App
import { context, dispatch } from "../../App"



const HandleWeekTeacher = (res) => {
    const storage = []

    for (const item of res.data["data"]) {
        if (item["thu"] === "*") {
            continue;
        }
        const temp = []
        Object.keys(item).forEach(function (key) {
            if (key === "tenmh" || key === "thu" || key === "tiet" || key === "phonghoc") {
                temp.push(item[key]);
            }
        });
        storage.push(temp);
    }

    for (let i = 0; i < storage.length; i++) {
        for (let j = 0; j < storage.length; j++) {
            const thu1 = parseInt(storage[i][1]);
            const thu2 = parseInt(storage[j][1]);
            if (thu1 < thu2) {
                let t = storage[i];
                storage[i] = storage[j];
                storage[j] = t;
            }
        }
    }

    for (const subarr of storage) {
        if (subarr[2][0] === "1" || subarr[2][0] === "2" || subarr[2][0] === "3" || subarr[2][0] === "4" || subarr[2][0] === "5") {
            subarr[2] = "Sáng";
        }
        else {
            subarr[2] = "Chiều";
        }
    }

    const result = [
        ["2", 0, 1],
        ["3", 0, 1],
        ["4", 0, 1],
        ["5", 0, 1],
        ["6", 0, 1],
        ["7", 0, 1],
    ]

    for (const ele of storage) {
        if (ele[1] === "2") {
            if (ele[2] === "Sáng") {
                result[0][1] = ele[0];
            }
            else {
                result[0][2] = ele[0];
            }
        }
        else if (ele[1] === "3") {
            if (ele[2] === "Sáng") {
                result[1][1] = ele[0];
            }
            else {
                result[1][2] = ele[0];
            }
        }
        else if (ele[1] === "4") {
            if (ele[2] === "Sáng") {
                result[2][1] = ele[0];
            }
            else {
                result[2][2] = ele[0];
            }
        }
        else if (ele[1] === "5") {
            if (ele[2] === "Sáng") {
                result[3][1] = ele[0];
            }
            else {
                result[3][2] = ele[0];
            }
        }
        else if (ele[1] === "6") {
            if (ele[2] === "Sáng") {
                result[4][1] = ele[0];
            }
            else {
                result[4][2] = ele[0];
            }
        }
        else if (ele[1] === "7") {
            if (ele[2] === "Sáng") {
                result[5][1] = ele[0];
            }
            else {
                result[5][2] = ele[0];
            }
        }
    }

    return result; 
}

const HandleWeekStudent  = (res) => {
    Array.prototype.move = function (from, to) {
        this.splice(to, 0, this.splice(from, 1)[0]);
        return this;
    };


    const storage = []

    for (const item of res.data["data"]) {
        const temp = []
        Object.keys(item).forEach(function (key) {
            if (key === "malop") {
                let code = item[key].split(".")
                temp.push(LessonCode[code[0]]);
            }

            if (key === "thu" || key === "tiet" || key === "phonghoc") {
                temp.push(item[key]);
            }
        });
        storage.push(temp);
    }

    for (const obj of storage) {
        obj.move(2, 0);
        obj.move(2, 3);
    }

    for (let i = 0; i < storage.length; i++) {
        for (let j = 0; j < storage.length; j++) {
            const thu1 = parseInt(storage[i][1]);
            const thu2 = parseInt(storage[j][1]);
            if (thu1 < thu2) {
                let t = storage[i];
                storage[i] = storage[j];
                storage[j] = t;
            }
        }
    }

    for (const subarr of storage) {
        if (subarr[2][0] === "1" || subarr[2][0] === "2" || subarr[2][0] === "3" || subarr[2][0] === "4" || subarr[2][0] === "5") {
            subarr[2] = "Sáng";
        }
        else {
            subarr[2] = "Chiều";
        }
    }

    const result = [
        ["2", 0, 1],
        ["3", 0, 1],
        ["4", 0, 1],
        ["5", 0, 1],
        ["6", 0, 1],
        ["7", 0, 1],
    ]

    for (const ele of storage) {
        if (ele[1] === "2") {
            if (ele[2] === "Sáng") {
                result[0][1] = ele[0];
            }
            else {
                result[0][2] = ele[0];
            }
        }
        else if (ele[1] === "3") {
            if (ele[2] === "Sáng") {
                result[1][1] = ele[0];
            }
            else {
                result[1][2] = ele[0];
            }
        }
        else if (ele[1] === "4") {
            if (ele[2] === "Sáng") {
                result[2][1] = ele[0];
            }
            else {
                result[2][2] = ele[0];
            }
        }
        else if (ele[1] === "5") {
            if (ele[2] === "Sáng") {
                result[3][1] = ele[0];
            }
            else {
                result[3][2] = ele[0];
            }
        }
        else if (ele[1] === "6") {
            if (ele[2] === "Sáng") {
                result[4][1] = ele[0];
            }
            else {
                result[4][2] = ele[0];
            }
        }
        else if (ele[1] === "7") {
            if (ele[2] === "Sáng") {
                result[5][1] = ele[0];
            }
            else {
                result[5][2] = ele[0];
            }
        }
    }

    return result;

}
const HandleWeekSchedule = (res) => {
    if (res.data["data"][0].hasOwnProperty("tenmh")) {
        return HandleWeekTeacher(res);
    }
    else {
        return HandleWeekStudent(res);
    }
}

const HandleForStudent = (res) => {
    Array.prototype.move = function (from, to) {
        this.splice(to, 0, this.splice(from, 1)[0]);
        return this;
    };


    const storage = []
    for (const item of res.data["data"]) {
        const temp = []
        Object.keys(item).forEach(function (key) {
            if (key === "malop") {
                let code = item[key].split(".")
                temp.push(LessonCode[code[0]]);
            }
            
            if (key === "thu" || key === "tiet" || key === "phonghoc") {
                temp.push(item[key]);
            }
        });
        storage.push(temp);
    }

    for (const obj of storage) {
        obj.move(2, 0);
        obj.move(2, 3);
    }




    for (let i = 0; i < storage.length; i++) {
        for (let j = 0; j < storage.length; j++) {
            const thu1 = parseInt(storage[i][1]);
            const thu2 = parseInt(storage[j][1]);
            if (thu1 < thu2) {
                let t = storage[i];
                storage[i] = storage[j];
                storage[j] = t;
            }
        }
    }


    const daySchedule = []
    var num = new Date().getDay();
    num += 1;
    //let today = num.toString()
    let today = '4';
    for (const element of storage) {
        if (element[1] === today) {
            daySchedule.push(element);
        }
    }
    return daySchedule;
}
const HandleForTeacher = (res) => {
    const storage = []
    for (const item of res.data["data"]) {
        if (item["thu"] === "*") {
            continue;
        }
        const temp = []
        Object.keys(item).forEach(function (key) {
            if (key === "tenmh" || key === "thu" || key === "tiet" || key === "phonghoc") {
                temp.push(item[key]);
            }
        });
        storage.push(temp);
    }

    for (let i = 0; i < storage.length; i++) {
        for (let j = 0; j < storage.length; j++) {
            const thu1 = parseInt(storage[i][1]);
            const thu2 = parseInt(storage[j][1]);
            if (thu1 < thu2) {
                let t = storage[i];
                storage[i] = storage[j];
                storage[j] = t;
            }
        }
    }


    const daySchedule = []
    var num = new Date().getDay();
    num += 1;
    let today = num.toString()
    for (const element of storage) {
        if (element[1] === today) {
            daySchedule.push(element);
        }
    }

    return daySchedule;
}

const HandleTodaySchedule = (res) => {
    if (res.data["data"][0].hasOwnProperty("tenmh") ){
        return HandleForTeacher(res);
    }
    else {
        return HandleForStudent(res);
    }
}

const INVALID_ID = "ID không hợp lệ!"
const VALID_ID = "ID hợp lệ!"


const UserRow = (props, ref) => {
    
    //Global contents and dispatch
    const Contents = useContext(context)
    const Actions = useContext(dispatch)
    const currentTime = new Date().toLocaleString();
    const [showDay, setshowDay] = useState(false);
    const [showWeek, setshowWeek] = useState(false)
    const [showIcon, setshowIcon] = useState(true);
    const [showEditIcon, setshowEditIcon] = useState(true);
    const [showTime, setShowTime] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    
    console.log("Current: ", props.user)

    //Ref to control sub components
    const editRef = useRef(null);


    //Week Schedule API
    const getWeekSchedule = async (uid, hocky, namhoc) => {
            const url = "https://api.mmlab.uit.edu.vn/calendar/";

            const data = JSON.stringify({
                uid,
                hocky,
                namhoc,
            });

            const config = {
                method: "post",
                url: url + "get-schedule",
                headers: {
                    "Content-Type": "application/json",
                },
                data: data,
            };
            const res = await axios(config);
            const result = HandleWeekSchedule(res);
            return result;
        };

    // Today Schedule API
    const getTodaySchedule = async (uid, hocky, namhoc) => {
        const url = "https://api.mmlab.uit.edu.vn/calendar/";

        const data = JSON.stringify({
            uid,
            hocky,
            namhoc,
        });

        const config = {
            method: "post",
            url: url + "get-schedule",
            headers: {
                "Content-Type": "application/json",
            },
            data: data,
        };
        const res = await axios(config);
        const daySchedule = HandleTodaySchedule(res);
        return daySchedule;

    };
    
    // OnClick Edit Button
    const HandleEditButton = () => {
        Actions.setName(props.index, "")
        editRef.current.toggleEdit(true); 
        setshowIcon(true);
        setshowEditIcon(false);
        setShowAlert(false);
    }

    //OnClick Save Button
    const HandleSaveButton = async () => {
        Actions.setUid(props.index, editRef.current.getData());
        const getNameData = await GetNameById(editRef.current.getData());
        console.log("Name: ", getNameData.hoten) 
        if (getNameData.code === 0 || getNameData.data.hoten === null){ //ID không hợp lệ 
            Actions.setStatus(props.index, INVALID_ID)
            setShowAlert(true);
            setshowIcon(true);
            setshowEditIcon(true);
            console.log("Code here")
        }
        else{
            Actions.setStatus(props.index, VALID_ID)
            const newName = getNameData.data.hoten;
            Actions.setName(props.index, newName);
            const newUid = editRef.current.getData();
            Actions.setUid(props.index, newUid)
            setShowAlert(false);
            setshowIcon(true);
            setshowEditIcon(true);
            
        }
        editRef.current.toggleEdit(false);
        
    }
   

    useEffect(()=>{
        console.log("Re-render")
    })

    const CheckTKB = async () => {
        const today = await getTodaySchedule(props.user.uid, 1, 2022); 
        const week = await getWeekSchedule(props.user.uid, 1, 2022);
        Actions.setDaySchedule(props.index, today)
        Actions.setWeekSchedule(props.index, week)

        if(today.length === 0)
        {
            Actions.setStatus(props.index, "Hôm nay bạn trống lịch");
            setShowAlert(true);
        }
        props.setRender(!props.render)
        setshowDay(!showDay);
        setshowWeek(!showWeek);
        setshowIcon(false);
        props.setStep(2);
       
    }

    const HandleHide = () => {
        setshowDay(false);
        setshowWeek(false);
        setshowIcon(true);
        setshowEditIcon(true);
        setShowAlert(false);
        props.setStep(1);
    }
    

    return (
        <>
            {/* USER INFOR */}
            <ListItem >

                {/* AVATATAR */}
                <ListItemAvatar>
                    <Avatar
                        src={props.user.path}
                        sx={{ width: 56, height: 56 }}
                    />
                </ListItemAvatar>

                {/* NAME vs uid */}
                <ListItemText
                    primary={props.user.name} 
                    secondary={<TextEdit user={props.user} ref={editRef}/>} 
                    sx={{ margin: "5px 15px 2px 20px", '& .MuiTypography-root':{fontSize: "25px", fontWeight: 600}}}
                />

                {/* EDIT vs SAVE ICON */}
                {showIcon ? 
                    (<ListItemIcon sx={{ '& .MuiButtonBase-root': { fontWeight: 500, width: "150px" }}}>
                        {showEditIcon ? 
                        <>
                            <Fab variant="extended" color={props.user.Status === INVALID_ID ? "error" : "default"} onClick={HandleEditButton}>
                            <EditIcon sx={{ mr: 2}} />
                            {props.user.name === "Người mới" ? "Đăng kí" : "Chỉnh sửa"}
                        </Fab>

                                <Fab variant="extended" color={'success'} sx={{ ml: 3 }} onClick={CheckTKB} disabled={props.user.Status === INVALID_ID || props.user.name === "Người mới" || props.user.uid === '' ? true : false}>
                                <CalendarMonthIcon sx={{ mr: 1 }} /> 
                                Xem
                        </Fab>
                        </>
                        :  
                        <Fab variant="extended" color={"success"} sx={{ padding: "20px" }} onClick={HandleSaveButton}>
                            <SaveIcon sx={{ mr: 2 }} />
                            Lưu
                        </Fab>}
                </ListItemIcon>)
                :
                <ListItemIcon sx={{ '& .MuiButtonBase-root': { fontWeight: 500, width: "150px" } }}>
                        <Fab variant="extended" color={'success'} sx={{ ml: 3 }} onClick={HandleHide}>
                            <CalendarMonthIcon sx={{ mr: 1 }} />
                            Ẩn
                        </Fab>
                </ListItemIcon>
                   
                }

                {/* SHOWTIME */}
                {/* {state.showTime && <h2 style={{ paddingTop: '2rem'}}>{currentTime}</h2>} */}

                
            </ListItem>

            {/* ALERT */}
            {showAlert && 
                <Alert 
                sx={{ mt: 2 }} 
                variant="outlined" 
                severity={props.user.Status === INVALID_ID ? "error" : "info"}>
                {props.user.Status}
            </Alert>}
                    
            {/* SCHEDULE */}
            {showDay && <DaySchedule user={props.user}/>}
            {showWeek && <WeekSchedule user={props.user} /> }
            
        </>
    )
}; 

export default UserRow;