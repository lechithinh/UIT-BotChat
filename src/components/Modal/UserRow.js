import React, { useState } from "react";
import { Box, Fab } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import { ListItem, ListItemAvatar, ListItemText, ListItemIcon } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import TodayIcon from '@mui/icons-material/Today';
import Schedule from "./Schedule";


const UserRow = (props) => {
    
    const [show, setShow] = useState(true);
    return (
        <>
            {show ? 
            (<ListItem>
                <ListItemAvatar>
                    <Avatar
                        src= {props["user"].picture}
                        sx={{ width: 56, height: 56 }}
                    />
                </ListItemAvatar>

                <ListItemText
                    primary={props['user'].name}
                    secondary={props['user'].MSSV}
                    sx={{ margin: "6px 15px 6px 15px" }}
                    onClick={()=>{console.log("thời khóa biểu cả tuần")}}
                />

                <ListItemIcon>
                    <Box sx={{ m: 1, position: "relative" }}>
                        <Fab sx={{ mr: 2 }} color="info">
                            <EditIcon onClick={()=>{console.log("Edit infor")}}/>
                        </Fab>

                        <Fab color="success">
                            <TodayIcon onClick={() => {setShow(!show)}} />
                        </Fab>
                    </Box>
                </ListItemIcon>

            </ListItem>)
            : <Schedule setShow={setShow} subject={props["user"]} />
            }
            
        </>
    )
}; 

export default UserRow;