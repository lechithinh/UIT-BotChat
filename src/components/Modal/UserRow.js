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

const steps = [
    'Nhận diện',
    'Kiểm tra thông tin',
    'Thời khóa biểu',
];




const UserRow = (props) => {
    
    
    const [showDay, setShowDay] = useState(false);
    const [showWeek, setShowWeek] = useState(false);
    const [step, setStep] = useState(1)
    const [value, setValue] = useState(0);
    const tkbRef = useRef(null);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleTabs = (index) => {
        if(index == 1){
            setStep(1);
            setValue(0);
            setShowDay(false); 
            setShowWeek(false);
        }
        else if (index == 2)
        {
            setStep(2);
            setValue(2);
            setShowDay(true);
            setShowWeek(true);
        }
        else if(index == 3)
        {
            setStep(3); 
            setTimeout(() => { props.setshowModal(false)}, 1000)
            
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

            console.log("store", storage)
            return storage;
            
        };
    
    

    return (
        <>
            <ListItem>
                <ListItemAvatar>
                    <Avatar
                        src= {props["user"].path}
                        sx={{ width: 56, height: 56 }}
                    />
                </ListItemAvatar>

                <ListItemText
                    primary={props['user'].name}
                    secondary={props['user'].MSSV}
                    sx={{ margin: "10px 20px 2px 20px"}}
                   
                />

                <ListItemIcon>
                    <Box sx={{ mb: 1, position: "relative" }}>
                        <Tabs value={value} onChange={handleChange} centered>
                            <Tab label="Chỉnh sửa" onClick={() => { setShowDay(false); setShowWeek(false); setStep(1)  }} />
                            <Tab label="TKB Ngày" onClick={() => { setShowDay(!showDay); setStep(2) }}/>
                            <Tab label="TKB Tuần" onClick={async () => { setShowWeek(!showWeek); setStep(2); tkbRef.current = await getSchedule("tiepnv", 1, 2022); }} />
                        </Tabs>                     
                    </Box>
                </ListItemIcon>

            </ListItem>

            <Box sx={{ width: '500px', ml: 3, mt: 2 }}>
                <Stepper activeStep={step} alternativeLabel>
                    {steps.map((label,index) => (
                        <Step key={label}>
                            <StepLabel onClick={() => { handleTabs(index)}}>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>

            {showDay && <DaySchedule user={props['user']}/>}
            {showWeek && <WeekSchedule tkb={tkbRef.current}/> }
            
        </>
    )
}; 

export default UserRow;