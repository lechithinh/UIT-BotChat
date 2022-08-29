import React from "react";
import { Box, Fab } from "@mui/material";
import { ListItem, ListItemAvatar, ListItemText, ListItemIcon } from '@mui/material';
import DirectionsIcon from '@mui/icons-material/Directions';

const DaySchedule = (props) => {
    console.log("props: ", props)
    return (
        <>
            <ListItem>
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