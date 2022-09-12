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
import HandleRegister from "../../utils/HandeleRegister";

//Global contents and dispatch from App
import { context, dispatch } from "../../App"
import { BorderTopRounded } from "@mui/icons-material";


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
        ["2", [], []],
        ["3", [], []],
        ["4", [], []],
        ["5", [], []],
        ["6", [], []],
        ["7", [], []],
    ]

    for (const ele of storage) {
        if (ele[1] === "2") {
            if (ele[2] === "Sáng") {
                result[0][1].push(ele[0]);
            }
            else {
                result[0][2].push(ele[0]);
            }
        }
        else if (ele[1] === "3") {
            if (ele[2] === "Sáng") {
                result[1][1].push(ele[0]);
            }
            else {
                result[1][2].push(ele[0]);
            }
        }
        else if (ele[1] === "4") {
            if (ele[2] === "Sáng") {
                result[2][1].push(ele[0]);
            }
            else {
                result[2][2].push(ele[0]);
            }
        }
        else if (ele[1] === "5") {
            if (ele[2] === "Sáng") {
                result[3][1].push(ele[0]);
            }
            else {
                result[3][2].push(ele[0]);
            }
        }
        else if (ele[1] === "6") {
            if (ele[2] === "Sáng") {
                result[4][1].push(ele[0]);
            }
            else {
                result[4][2].push(ele[0]);
            }
        }
        else if (ele[1] === "7") {
            if (ele[2] === "Sáng") {
                result[5][1].push(ele[0]);
            }
            else {
                result[5][2].push(ele[0]);
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
        if (item["thu"] === "*") {
            continue;
        }
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
        ["2", [], []],
        ["3", [], []],
        ["4", [], []],
        ["5", [], []],
        ["6", [], []],
        ["7", [], []],
    ]

    for (const ele of storage) {
        if (ele[1] === "2") {
            if (ele[2] === "Sáng") {
                result[0][1].push(ele[0]);
            }
            else {
                result[0][2].push(ele[0]);
            }
        }
        else if (ele[1] === "3") {
            if (ele[2] === "Sáng") {
                result[1][1].push(ele[0]);
            }
            else {
                result[1][2].push(ele[0]);
            }
        }
        else if (ele[1] === "4") {
            if (ele[2] === "Sáng") {
                result[2][1].push(ele[0]);
            }
            else {
                result[2][2].push(ele[0]);
            }
        }
        else if (ele[1] === "5") {
            if (ele[2] === "Sáng") {
                result[3][1].push(ele[0]);
            }
            else {
                result[3][2].push(ele[0]);
            }
        }
        else if (ele[1] === "6") {
            if (ele[2] === "Sáng") {
                result[4][1].push(ele[0]);
            }
            else {
                result[4][2].push(ele[0]);
            }
        }
        else if (ele[1] === "7") {
            if (ele[2] === "Sáng") {
                result[5][1].push(ele[0]);
            }
            else {
                result[5][2].push(ele[0]);
            }
        }
    }

    return result;

}
const HandleWeekSchedule = (props,res) => {
    if (isNumber(props.user.uid)) {
        return HandleWeekStudent(res)
    }
    else {
        return HandleWeekTeacher(res);
    }
}

const HandleForStudent = (res) => {
    Array.prototype.move = function (from, to) {
        this.splice(to, 0, this.splice(from, 1)[0]);
        return this;
    };


    const storage = []
    for (const item of res.data["data"]) {
        if (item["thu"] === "*") {
            continue;
        }
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
    let today = num.toString()
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

const HandleTodaySchedule = (props,res) => {
    if (isNumber(props.user.uid)) {
        return HandleForStudent(res)
    }
    else {
        return HandleForTeacher(res);
    }
}

function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }

const CheckUID = (uid) => {
    if(isNumber(uid)){
        return uid + STUDENT_GMAIL;
    }
    else{
        return uid.toLowerCase() + TEACHER_GMAIL;
    }
}

const INVALID_ID = "ID không hợp lệ!"
const VALID_ID = "ID hợp lệ!"
const STUDENT_GMAIL = "@gm.uit.edu.vn";
const TEACHER_GMAIL = "@uit.edu.vn"


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
    
    

    //Ref to control sub components
    const editRef = useRef(null);


    //Week Schedule API
    const getSchedule = async (uid, hocky, namhoc) => {
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
            console.log("TKB raw: ", res.data['data'])
            const weekSchedule = HandleWeekSchedule(props,res);
            const daySchedule = HandleTodaySchedule(props,res);
            console.log("Week: ", weekSchedule)
            return {"today": daySchedule, "week": weekSchedule};
        };

    // Today Schedule API

    
    // OnClick Edit Button
    const HandleEditButton = () => {
        Actions.setName(props.index, "")
        editRef.current.toggleEdit(true); 
        setshowIcon(true);
        setshowEditIcon(false);
        setShowAlert(false);
        PlayAudio("edit")
    }

    //OnClick Save Button
    const HandleSaveButton = async () => {
        Actions.setUid(props.index, editRef.current.getData());
        const getNameData = await GetNameById(editRef.current.getData());
        if (getNameData.code === 0 || getNameData.data.hoten === null){ //ID không hợp lệ 
            Actions.setStatus(props.index, INVALID_ID)
            setShowAlert(true);
            setshowIcon(true);
            setshowEditIcon(true);
            PlayAudio('errorsave')
        }
        else{
            const email = CheckUID(editRef.current.getData());
            
            Actions.setStatus(props.index, VALID_ID)
            const newName = getNameData.data.hoten;
            Actions.setName(props.index, newName);
            const newUid = editRef.current.getData();
            Actions.setUid(props.index, newUid);

            //Upload to API register
            //HandleRegister(newName + ' - ' + email, props.user.path);
            
            setShowAlert(false);
            setshowIcon(true);
            setshowEditIcon(true);
            PlayAudio('save')
            
        }
        editRef.current.toggleEdit(false);
        
    }
   

    useEffect(()=>{
        console.log("Re-render")
    })

    const CheckTKB = async () => {
        const schedule= await getSchedule(props.user.uid, 1, 2022);
        Actions.setDaySchedule(props.index, schedule.today)
        Actions.setWeekSchedule(props.index, schedule.week)
        Actions.setCurrentWorking(props.index, true);
        if (schedule.today.length === 0)
        {
            Actions.setStatus(props.index, "Hôm nay bạn trống lịch");
            setShowAlert(true);
            PlayAudio('noschedule');
        }

        if (schedule.today.length > 10) {
            Actions.setStatus(props.index, INVALID_ID);
            setshowDay(false);
            setShowAlert(true);
        }
        else{

            //Re-render main components
            props.setRender(!props.render)
            props.setStep(2);
        }


       
    }

    const HandleHide = () => {
        setshowDay(false);
        setshowWeek(false);
        setshowIcon(true);
        setshowEditIcon(true);
        setShowAlert(false);
        Actions.setWorkingValue(props.index, false);
        props.setStep(1);
    }
    

    //Use current variable to control 1 viewer at the same time
    useEffect(() => {
        if (props.user.working )
        {
            if (props.user.Status != INVALID_ID)
            {
                setshowDay(true);
                setshowWeek(true);
                setshowIcon(false);
            }
            else{
                setshowDay(false);
                setshowWeek(false);
                setshowIcon(false);
                setShowAlert(true);
            }
            
        }
        else{
            setshowIcon(true);
            setshowEditIcon(true);
            setshowDay(false);
            setshowWeek(false);
            setShowAlert(false);
        }
    }, [props.user.working])
    

    return (
        <>
            {/* USER INFOR */} 

            <ListItem sx={{ backgroundColor: props.user.working ? "#DEE9F3" : "white"}}>

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
                    (<ListItemIcon sx={{ '& .MuiButtonBase-root': { fontWeight: 500, width: "180px", fontSize: "1.2rem" }}}>
                        {showEditIcon ? 
                        <>
                            <Fab variant="extended" color={props.user.Status === INVALID_ID ? "error" : "default"} onClick={HandleEditButton}>
                            <EditIcon sx={{ mr: 2}} />
                            {props.user.name === "Người mới" ? "Đăng kí" : "Chỉnh sửa"}
                        </Fab>

                                <Fab variant="extended" color={'success'} sx={{ ml: 3 }} onClick={CheckTKB} disabled={props.user.Status === INVALID_ID || props.user.name === "Người mới" || props.user.uid === '' ? true : false}>
                                <CalendarMonthIcon sx={{ mr: 1 }} /> 
                                Xem lịch
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
                sx={{ mt: 2, mb: 2, '& .MuiAlert-message': { fontSize: '1.7rem' }, '& .MuiAlert-icon': {marginTop: "4px", fontSize: "35px"} }} 
                variant="standard" 
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