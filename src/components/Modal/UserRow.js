//React
import React, { useState, useRef, useContext, useEffect, useReducer, forwardRef, useImperativeHandle } from "react";

//Libaries
import axios from "axios";

//Components
import { Box, Fab } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import { ListItem, ListItemAvatar, ListItemText, ListItemIcon } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Alert from '@mui/material/Alert';

//Sub components
import TextEdit from "./Textedit";
import DaySchedule from "./DaySchedule";
import WeekSchedule from "./WeekSchedule"

//Utils
import GetNameById from "../../utils/GetNameById";

//Global contents and dispatch from App
import { context, dispatch } from "../../App"



const HandleWeekSchedule = (res) => {
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

const HandleToDaySchedule = (res) => {
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
const state_init = {
    showDay: false,
    showWeek: false,
    showIcon: true,
    showEditIcon: true,
    showTime: false,
    showAlert: false,
    value: 0,
    

}
const reducer = (state, action) => {
    switch (action.type){
        case "INFOR":
            return {
                showIcon: true,
                showEditIcon: true,
                showDay: false,
                showWeek: false,
                showTime: false,
                value: 0,
            }
        case "TODAY_SCHEDULE":
            return {
                showIcon: false,
                showDay: !state.showDay,
                showTime: true,
                value: state.value,
            }
        case "WEEK_SCHEDULE":
            return {
                showIcon: false,
                showDay: true,
                showWeek: !state.showWeek,
                showTime: true,
                value: state.value,
            }
        case "EDIT_BUTTON":
            return {
                showIcon: true,
                showEditIcon: false,
                showAlert: false,
                value: 0,
            }
        case "SAVE_BUTTON":
            return {
                showIcon: true,
                showEditIcon: true,
                showAlert: state.showAlert,
                value: 0,
            }
        case "INVALID_ID":
            return {
                showAlert: true,
                value: 0,
            }
        case "VALID_ID":
            return {
                showAlert: false,
                value: 0,
            }
        case "CHANGE_TABS":
            return {
                value: action.payload,
            }
        case "NO_SCHEDULE":
            return {
                showIcon: false,
                showDay: !state.showDay,
                showAlert: true,
                showTime: true,
                value: 1,
            }

    }

}




const UserRow = (props, ref) => {
    
    //Global contents and dispatch
    const Contents = useContext(context)
    const Actions = useContext(dispatch)
    const currentTime = new Date().toLocaleString();


    //All states
    const [state, state_action] = useReducer(reducer, state_init)

    console.log("Current Data: ", Contents.current.dataRef.current)

    //Ref to control sub components
    const editRef = useRef(null);


    //OnClick Tabs
    const HandleTabs = (event, newValue) => {
        state_action({ type: "CHANGE_TABS", payload: newValue })
    };


    //OnClick Infor
    const HandleInfor = () => {
        props.setStep(1)
        state_action({ type: "INFOR" }) 
    }

    //OnClick ToDay Schedule
    const HandleToDay = async () => { 
        props.setStep(2)
        await getTodaySchedule(Contents.current.dataRef.current.uid, 1, 2022); 
        state_action({ type: "TODAY_SCHEDULE" })

        if (Contents.current.dataRef.current.DaySchedule.length === 0){
            Actions.setStatus("Hôm nay bạn không có lịch học!")
            state_action({ type: "NO_SCHEDULE" })
        }

        if (Contents.current.dataRef.current.DaySchedule.length > 5){
            Actions.setStatus("ID không hợp lệ!")
            state_action({ type: "NO_SCHEDULE" })
        }
    }

    //OnClick Week Schedule
    const HandleWeek = async () => {
        props.setStep(2)
        await getWeekSchedule(Contents.current.dataRef.current.uid, 1, 2022); 
        state_action({ type: "WEEK_SCHEDULE" })
    }

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
            Actions.setWeekSchedule(result);
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

        const daySchedule = HandleToDaySchedule(res);
        Actions.setDaySchedule(daySchedule);
    
        
        return daySchedule;

    };
    
    // OnClick Edit Button
    const HandleEditButton = async () => {
        Actions.setName("");
        editRef.current.toggleEdit(true); 
        state_action({ type: "EDIT_BUTTON" })
    }

    //OnClick Save Button
    const HandleSaveButton = async () => {
        Actions.setUid(editRef.current.getData());
        const getNameData = await GetNameById(editRef.current.getData()); 
        if (getNameData.code === 0){ //ID không hợp lệ => disable những cái tabs khác
            Actions.setStatus("ID không hợp lệ!")
            state_action({ type: "INVALID_ID" })
           
        }
        else{
            state_action({ type: "VALID_ID" })
            Actions.setStatus("ID hợp lệ!")
            const newName = getNameData.data.hoten;
            Actions.setName(newName);
            const newUid = editRef.current.getData();
            Actions.setUid(newUid)
        }
        state_action({ type: "SAVE_BUTTON" })
        editRef.current.toggleEdit(false); 
    }
   

    useEffect(()=>{
        console.log("Re-render")
    })


    

    return (
        <>
            {/* TABS */}
            <Box sx={{ mb: 2, position: "relative", mt: 2, '& .MuiTab-root': {fontSize: "23px", fontWeight: "700"} }}>
                <Tabs value={state.value} onChange={HandleTabs} centered>
                    <Tab label="Thông tin"  onClick={HandleInfor}  />
                    <Tab label="TKB Ngày" disabled={Contents.current.dataRef.current.Status === "ID không hợp lệ!" || Contents.current.dataRef.current.name === "Người mới" ? true : false} onClick={HandleToDay} />
                    <Tab label="TKB Tuần" disabled={Contents.current.dataRef.current.Status === "ID không hợp lệ!" || Contents.current.dataRef.current.name === "Người mới" ? true : false} onClick={HandleWeek} />
                </Tabs>                     
            </Box>
     

            {/* USER INFOR */}
            <ListItem>

                {/* AVATATAR */}
                <ListItemAvatar>
                    <Avatar
                        src={Contents.current.dataRef.current.path}
                        sx={{ width: 56, height: 56 }}
                    />
                </ListItemAvatar>

                {/* NAME vs uid */}
                <ListItemText
                    primary={Contents.current.dataRef.current.name} 
                    secondary={<TextEdit ref={editRef}/>} 
                    sx={{ margin: "5px 15px 2px 20px", '& .MuiTypography-root':{fontSize: "25px", fontWeight: 600}}}
                />

                {/* EDIT vs SAVE ICON */}
                {state.showIcon && 
                (<ListItemIcon sx={{ '& .MuiButtonBase-root': { fontWeight: 600, width: "200px"} }}>
                        {state.showEditIcon ? 
                        <Fab variant="extended" color={Contents.current.dataRef.current.Status === "ID không hợp lệ!" ? "error" : "default"} onClick={HandleEditButton}>
                            <EditIcon sx={{ mr: 2}} />
                            {Contents.current.dataRef.current.name === "Người mới" ? "Đăng kí người mới" : "Chỉnh sửa"}
                        </Fab> 
                        : 
                        <Fab variant="extended" color="success" onClick={HandleSaveButton}>
                            <SaveIcon sx={{ mr: 2 }} />
                            Lưu
                        </Fab>}
                </ListItemIcon>)}

                {state.showTime && <h2 style={{ paddingTop: '2rem'}}>{currentTime}</h2>}
                
            </ListItem>

            {/* ALERT */}
            {state.showAlert && 
                <Alert 
                sx={{ mt: 2 }} 
                variant="outlined" 
                severity={Contents.current.dataRef.current.Status === "ID không hợp lệ!" ? "error" : "info"}>
                {Contents.current.dataRef.current.Status}
            </Alert>}
                    
            {/* SCHEDULE */}
            {state.showDay && <DaySchedule />}
            {state.showWeek && <WeekSchedule /> }
            
        </>
    )
}; 

export default UserRow;