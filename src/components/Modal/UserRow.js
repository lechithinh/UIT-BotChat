import React, { useState, useRef } from "react";
import { Box, Fab } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import { ListItem, ListItemAvatar, ListItemText, ListItemIcon } from '@mui/material';
import DaySchedule from "./DaySchedule";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import WeekSchedule from "./WeekSchedule"
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import axios from "axios";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import GetNameById from "../../utils/GetNameById";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import TextEdit from "./Textedit";
const steps = [
    'Nhận diện',
    'Kiểm tra thông tin',
    'Thời khóa biểu',
];


// Focus to Edit + save => api getName => Update model
// Handle auto close
// Clean code
// Clean TKB
// Clean Css

const UserRow = (props) => {
    
    
    const [showDay, setShowDay] = useState(false);
    const [showWeek, setShowWeek] = useState(false);
    const [showEdit, setShowEdit] = useState(true);
    const [step, setStep] = useState(1)
    const [value, setValue] = useState(0);
    const [newName, setNewName] = useState(props['user'].name)
    const [hideEdit, togglehideEdit] = useState(true)
    const tkbRef = useRef(null);
    const todaytkbRef = useRef(null);
    const editRef = useRef(null);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleTabs = async (index) => {
        if(index == 1){
            setStep(1);
            setValue(0);
            setShowDay(false); 
            setShowWeek(false);
            togglehideEdit(true);
        }
        else if (index == 2)
        {
            setStep(2);
            setValue(2);
            todaytkbRef.current = await getTodaySchedule(props["user"].uui, 1, 2022);
            tkbRef.current = await getSchedule(props["user"].uui, 1, 2022);
            setShowDay(true);
            setShowWeek(true);
            togglehideEdit(false);
        }
    }

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
            
            const storage = []


            for (const item of res.data["data"]) {
                if (item["thu"] == "*") {
                    continue;
                }
                const temp = []
                Object.keys(item).forEach(function (key) {
                    if (key == "tenmh" || key == "thu" || key == "tiet" || key == "phonghoc") {
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
                if (subarr[2][0] == "1" || subarr[2][0] == "2" || subarr[2][0] == "3" || subarr[2][0] == "4" || subarr[2][0] == "5") {
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
                if (ele[1] == "2") {
                    if (ele[2] == "Sáng") {
                        result[0][1] = ele[0];
                    }
                    else {
                        result[0][2] = ele[0];
                    }
                }
                else if (ele[1] == "3") {
                    if (ele[2] == "Sáng") {
                        result[1][1] = ele[0];
                    }
                    else {
                        result[1][2] = ele[0];
                    }
                }
                else if (ele[1] == "4") {
                    if (ele[2] == "Sáng") {
                        result[2][1] = ele[0];
                    }
                    else {
                        result[2][2] = ele[0];
                    }
                }
                else if (ele[1] == "5") {
                    if (ele[2] == "Sáng") {
                        result[3][1] = ele[0];
                    }
                    else {
                        result[3][2] = ele[0];
                    }
                }
                else if (ele[1] == "6") {
                    if (ele[2] == "Sáng") {
                        result[4][1] = ele[0];
                    }
                    else {
                        result[4][2] = ele[0];
                    }
                }
                else if (ele[1] == "7") {
                    if (ele[2] == "Sáng") {
                        result[5][1] = ele[0];
                    }
                    else {
                        result[5][2] = ele[0];
                    }
                }
            }

            console.log("Raw TKB: ", res.data["data"])
            console.log("Full TKB: ", result)
            return result;
            
        };

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

        const storage = []


        for (const item of res.data["data"]) {
            if (item["thu"] == "*") {
                continue;
            }
            const temp = []
            Object.keys(item).forEach(function (key) {
                if (key == "tenmh" || key == "thu" || key == "tiet" || key == "phonghoc") {
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
        var num =  new Date().getDay();
        num += 1;
        let today = num.toString()
        for (const element of storage) {
            if (element[1] === today) {
                daySchedule.push(element);
            }
        }

        console.log(daySchedule)
        return daySchedule;

    };
    
   

    return (
        <>
            {/* PROGRESS */}
            <Box sx={{ width: '500px', ml: 3, mt: 2 }}>
                <Stepper activeStep={step} alternativeLabel>
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel onClick={() => { handleTabs(index) }}>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>


            {/* TABS */}
            <Box sx={{ mb: 2, position: "relative", mt: 2 }}>
                <Tabs value={value} onChange={handleChange} centered>
                    <Tab label="Thông tin" onClick={() => { setShowDay(false); setShowWeek(false); setStep(1); togglehideEdit(true);  }} />
                    <Tab label="TKB Ngày" onClick={async () => { setStep(2); todaytkbRef.current = await getTodaySchedule(props["user"].uui, 1, 2022); setShowDay(!showDay); togglehideEdit(false); }}/>
                    <Tab label="TKB Tuần" onClick={async () => { setStep(2); tkbRef.current = await getSchedule(props["user"].uui, 1, 2022); setShowWeek(!showWeek); togglehideEdit(false); }} />
                </Tabs>                     
            </Box>
     

            {/* USER */}
            <ListItem>
                <ListItemAvatar>
                    <Avatar
                        src={props["user"].path}
                        sx={{ width: 56, height: 56 }}
                    />
                </ListItemAvatar>

                <ListItemText
                    primary={newName}
                    secondary={<TextEdit user={props['user']} ref={editRef}/>} //uui
                    sx={{ margin: "10px 20px 2px 20px" }}
                />

                {hideEdit && (<ListItemIcon >
                        {showEdit ? 
                        <Fab variant="extended" onClick={() => { setShowEdit(false); setNewName(""); editRef.current.toggleEdit(true) }}>
                            <EditIcon sx={{ mr:2 }} />
                            Chỉnh sửa
                        </Fab> 
                        : 
                        <Fab variant="extended" color="success" onClick={async () => { const getNameData = await GetNameById(editRef.current.getData()); setShowEdit(true); setNewName(getNameData.data.hoten); props['user'].uui = editRef.current.getData() ;editRef.current.toggleEdit(false);  }}>
                            <SaveIcon sx={{ mr: 2 }} />
                            Lưu
                        </Fab>}
                </ListItemIcon>)}
            </ListItem>

                    
            {/* Day and Week Schedule */}
            {showDay && <DaySchedule user={props['user']} todaytkb={todaytkbRef.current} />}
            {showWeek && <WeekSchedule tkb={tkbRef.current}/> }
            
        </>
    )
}; 

export default UserRow;