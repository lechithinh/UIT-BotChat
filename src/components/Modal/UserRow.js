//React
import React, { useState, useRef, useContext, useEffect } from "react";

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


// Content Progress
const steps = [
    'Nhận diện',
    'Kiểm tra thông tin',
    'Thời khóa biểu',
];

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

const UserRow = (props) => {
    
    //Global contents and dispatch
    const Contents = useContext(context)
    const Actions = useContext(dispatch)

    console.log("Current Data: ", Contents.current.dataRef.current)

    //Components control
    const [showDay, setShowDay] = useState(false);
    const [showWeek, setShowWeek] = useState(false);
    const [showIcon, setShowIcon] = useState(true)
    const [showEditIcon, setShowEditIcon] = useState(true);
    const [showAlert, setShowAlert] = useState(false);

    //Tabs and progress control
    const [step, setStep] = useState(1)
    const [value, setValue] = useState(0);

    //Ref to control sub components
    const editRef = useRef(null);

    //OnClick Tabs
    const HandleTabs = (event, newValue) => {
        setValue(newValue);
    };

    // OnClick Progress
    const HandleProgress = async (index) => {
        if(index === 1){
            setStep(1);
            setValue(0);
            setShowDay(false); 
            setShowWeek(false);
            setShowIcon(true);
        }
        else if (index === 2)
        {
            setStep(2);
            setValue(2);
            await getTodaySchedule(Contents.current.dataRef.current.uid, 1, 2022);
            await getSchedule(Contents.current.dataRef.current.uid, 1, 2022);
            setShowDay(true);
            setShowWeek(true);
            setShowIcon(false);
        }
    }

    //OnClick Infor
    const HandleInfor = () => {
        setShowDay(false); 
        setShowWeek(false); 
        setStep(1); 
        setShowIcon(true);
    }

    //OnClick ToDay Schedule
    const HandleToDay = async () => {
        setStep(2); 
        await getTodaySchedule(Contents.current.dataRef.current.uid, 1, 2022); 
        setShowDay(!showDay); 
        setShowIcon(false);
    }

    //OnClick Week Schedule
    const HandleWeek = async () => {
        setStep(2); 
        await getSchedule(Contents.current.dataRef.current.uid, 1, 2022); 
        setShowWeek(!showWeek); 
        setShowIcon(false); 
    }

    //Week Schedule API
    const getSchedule = async (uid, hocky, namhoc) => {
            const url = "http://localhost:3001/";

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
        const url = "http://localhost:3001/";

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
        setShowEditIcon(false); 
        Actions.setName("");
        editRef.current.toggleEdit(true); 
        setShowAlert(false) 
    }

    //OnClick Save Button
    const HandleSaveButton = async () => {
        const getNameData = await GetNameById(editRef.current.getData()); 
        if (getNameData.code === 0){ //ID không hợp lệ => disable những cái tabs khác
            setShowAlert(true)
           
        }
        else{
            setShowAlert(false); 
        }
        setShowEditIcon(true);
        Actions.setName(getNameData.data.hoten);
        const newUid = editRef.current.getData(); 
        Actions.setUid(newUid)
        const newName = getNameData.data.hoten;
        Actions.setName(newName);
        editRef.current.toggleEdit(false); 
    }
   

    useEffect(()=>{
        console.log("Re-render")
    })

    return (
        <>
            {/* PROGRESS */}
            <Box sx={{ width: '500px', ml: 3, mt: 2 }}>
                <Stepper activeStep={step} alternativeLabel>
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel onClick={() => { HandleProgress(index) }}>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>


            {/* TABS */}
            <Box sx={{ mb: 2, position: "relative", mt: 2 }}>
                <Tabs value={value} onChange={HandleTabs} centered>
                    <Tab label="Thông tin" onClick={HandleInfor} />
                    <Tab label="TKB Ngày" onClick={HandleToDay}/>
                    <Tab label="TKB Tuần" onClick={HandleWeek} />
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
                    sx={{ margin: "10px 20px 2px 20px" }}
                />

                {/* EDIT vs SAVE ICON */}
                {showIcon && 
                (<ListItemIcon >
                        {showEditIcon ? 
                        <Fab variant="extended" onClick={HandleEditButton}>
                            <EditIcon sx={{ mr:2 }} />
                            Chỉnh sửa
                        </Fab> 
                        : 
                        <Fab variant="extended" color="success" onClick={HandleSaveButton}>
                            <SaveIcon sx={{ mr: 2 }} />
                            Lưu
                        </Fab>}
                </ListItemIcon>)}
                
            </ListItem>

            {/* ALERT */}
            {showAlert && 
            <Alert sx={{ mt: 2 }} variant="outlined" severity="error">
                ID không hợp lệ!
            </Alert>}
                    
            {/* SCHEDULE */}
            {showDay && <DaySchedule />}
            {showWeek && <WeekSchedule /> }
            
        </>
    )
}; 

export default UserRow;