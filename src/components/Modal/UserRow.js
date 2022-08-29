import React, { useState } from "react";
import { Box, Fab } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import { ListItem, ListItemAvatar, ListItemText, ListItemIcon } from '@mui/material';
import DaySchedule from "./DaySchedule";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import WeekSchedule from "./WeekSchedule"

const UserRow = (props) => {
    
    const [showDay, setShowDay] = useState(false);
    const [showWeek, setShowWeek] = useState(false);

    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <ListItem>
                <ListItemAvatar>
                    <Avatar
                        src= {props["user"].picture}
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
                            <Tab label="Chỉnh sửa" onClick={() => { setShowDay(false); setShowWeek(false)  }} />
                            <Tab label="TKB Ngày" onClick={() => { setShowDay(!showDay)}}/>
                            <Tab label="TKB Tuần" onClick={() => { setShowWeek(!showWeek)}} />
                        </Tabs>                     
                    </Box>
                </ListItemIcon>

            </ListItem>

            {showDay && <DaySchedule subject={props['user']}/>}
            {showWeek && <WeekSchedule /> }
            
        </>
    )
}; 

export default UserRow;