import React from "react";
import { Box, Fab } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import { ListItem, ListItemAvatar, ListItemText, ListItemIcon } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DirectionsIcon from '@mui/icons-material/Directions';

const Schedule = (props) => {
    console.log("props: ", props)
    return (
        <>
            <ListItem>
                <ListItemAvatar>
                    <Avatar
                        src={props["subject"].picture}
                        sx={{ width: 56, height: 56 }}
                    />
                </ListItemAvatar>

                <ListItemText
                    primary={props["subject"].subject1}
                    secondary={props["subject"].time1 + "  |  " + props["subject"].room1}
                    sx={{ margin: "6px 15px 6px 15px" }}
                />

                {props["subject"].subject2 &&  <ListItemText
                    primary={props["subject"].subject2}
                    secondary={props["subject"].time2 + "  |  " + props["subject"].room2}
                    sx={{ margin: "6px 15px 6px 15px" }}
                />}

                <ListItemIcon>
                    <Box sx={{ m: 1, position: "relative" }}>
                        <Fab sx={{ mr: 2 }} color="info">
                            <CheckCircleIcon onClick={() => {props.setShow(true)}} />
                        </Fab>

                        <Fab sx={{ mr: 2 }} color="info">
                            <DirectionsIcon onClick={() => { console.log("Chỉ đường")}} />
                        </Fab>

                        
                    </Box>
                </ListItemIcon>

            </ListItem>
        </>
    )
};


export default Schedule;