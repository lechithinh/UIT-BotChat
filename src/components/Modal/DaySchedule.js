//React
import React, {useContext} from "react";

//Components
import { Box, Fab } from "@mui/material";
import { ListItem, ListItemText, ListItemIcon } from '@mui/material';
import DirectionsIcon from '@mui/icons-material/Directions';

//Global contents and dispatch from App
import { context, dispatch } from "../../App"

const DaySchedule = (props) => {

    //Global contents and dispatch
    const Contents = useContext(context)
    const Actions = useContext(dispatch)

    const Schedule = Contents.current.dataRef.current.DaySchedule;

    return (
        <>
            <ListItem>
                
                {Schedule ?
                    (Schedule.map((row, index) => (
                        <ListItemText
                            key={index}
                            primary={row[0]}
                            secondary={"Tiết " + row[2] + "  |  " + row[3]}
                            sx={{ margin: "6px 15px 6px 15px", "& .MuiTypography-root": {fontSize: "1.6rem"} }}
                        />
                    ))) : <ListItem />} 


                {Schedule.length != 0 && 
                <ListItemIcon>
                    <Box sx={{ mr: -5, position: "relative" }}>
                        <Fab sx={{ m: 4 }} color="info" variant="extended">
                            <DirectionsIcon onClick={() => { console.log("Chỉ đường") }} sx={{ mr: 2 }} />
                            Chỉ đường
                        </Fab>
                    </Box>
                </ListItemIcon>}
               

            </ListItem>
        </>
    )
};


export default DaySchedule;