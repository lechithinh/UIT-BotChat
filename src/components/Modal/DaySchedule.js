//React
import React from "react";

//Components
import { Box, Fab } from "@mui/material";
import { ListItem, ListItemText, ListItemIcon } from '@mui/material';
import DirectionsIcon from '@mui/icons-material/Directions';

const DaySchedule = (props) => {
    console.log("TKB ToDay: ", props.dayschedule)
    return (
        <>
            <ListItem>
                
                {props.dayschedule ?
                    (props.dayschedule.map((row, index) => (
                        <ListItemText
                            key={index}
                            primary={row[0]}
                            secondary={row[2] + "  |  " + row[3]}
                            sx={{ margin: "6px 15px 6px 15px" }}
                        />
                    ))) : <ListItem />} 


                {props.dayschedule.length != 0 && 
                <ListItemIcon>
                    <Box sx={{ mr: -5, position: "relative" }}>
                        <Fab sx={{ m: 2 }} color="info" variant="extended">
                            <DirectionsIcon onClick={() => { console.log("Chỉ đường") }} sx={{ mr: 1 }} />
                            Chỉ đường
                        </Fab>
                    </Box>
                </ListItemIcon>}
               

            </ListItem>
        </>
    )
};


export default DaySchedule;