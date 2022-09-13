//React
import React, {useContext} from "react";

//Components
import { Box, Fab } from "@mui/material";
import { ListItem, ListItemText, ListItemIcon } from '@mui/material';
import DirectionsIcon from '@mui/icons-material/Directions';

//Global contents and dispatch from App
import { context, dispatch } from "../../App"

//http://map.mmlab.uit.edu.vn/map-wayfinding?from=A&to=A115


const HandleRoom = (DaySchedule) => {
    const room = DaySchedule[3]
    if (room.startsWith('C'))
    {
        return room.split(' ')[0];
    }
    else if (room.startsWith('B'))
    {
        return room.split('.').join("");
    }
    else{
        return room;
    }
}
const DaySchedule = (props) => {

    //Global contents and dispatch
    const Contents = useContext(context)
    const Actions = useContext(dispatch)
    let DirectTo = 'http://map.mmlab.uit.edu.vn/map-wayfinding?from=A&to='
    const HandleDirection = () => {
        if (props.user.DaySchedule)
        {
            
            let rom = HandleRoom(props.user.DaySchedule[0]);
            DirectTo += rom;
            window.location.href = DirectTo;
        }
        console.log(DirectTo)
    }
    return (
        <>
            <ListItem sx={{ backgroundColor: props.user.working ? "#ECEDEE" : "white", mt: 1, mb: 1 }}>
                
                {props.user.DaySchedule ?
                    (props.user.DaySchedule.map((row, index) => (
                        <ListItemText
                            key={index}
                            primary={row[0]}
                            secondary={"Tiết " + row[2] + "  | Phòng " + row[3]}
                            sx={{ margin: "6px 15px 6px 15px", "& .MuiTypography-root": {fontSize: "1.6rem", fontWeight: 600} }}
                        />
                    ))) : <ListItem />} 


                {props.user.DaySchedule.length != 0 && 
                <ListItemIcon>
                    <Box sx={{ mr: -5, position: "relative" }}>
                            <Fab sx={{ m: 4 }} color="info" variant="extended" onClick={HandleDirection}>
                                <DirectionsIcon  sx={{ mr: 2 }} />
                            Chỉ đường
                        </Fab>
                    </Box>
                </ListItemIcon>}
               

            </ListItem>
        </>
    )
};


export default DaySchedule;