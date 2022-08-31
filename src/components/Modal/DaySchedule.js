import React from "react";
import { Box, Fab } from "@mui/material";
import { ListItem, ListItemAvatar, ListItemText, ListItemIcon } from '@mui/material';
import DirectionsIcon from '@mui/icons-material/Directions';

const DaySchedule = (props) => {
    return (
        <>
            <ListItem>
                <ListItemText
                    primary={props["user"].subject1}
                    secondary={props["user"].time1 + "  |  " + props["user"].room1}
                    sx={{ margin: "6px 15px 6px 15px" }}
                />

                {props["user"].subject2 &&  <ListItemText
                    primary={props["user"].subject2}
                    secondary={props["user"].time2 + "  |  " + props["user"].room2}
                    sx={{ margin: "6px 15px 6px 15px" }}
                />}

                <ListItemIcon>
                    <Box sx={{ mr: -5, position: "relative" }}>
                        <Fab sx={{ m: 2 }} color="info" variant="extended">
                            <DirectionsIcon onClick={() => { console.log("Chỉ đường") }} sx={{ mr: 1 }} />
                            Chỉ đường
                        </Fab>

                        
                    </Box>
                </ListItemIcon>

            </ListItem>
        </>
    )
};


export default DaySchedule;