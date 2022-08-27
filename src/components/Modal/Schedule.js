import React from "react";
import { Box, Fab } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import { ListItem, ListItemAvatar, ListItemText, ListItemIcon } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Schedule = (props) => {
    return (
        <>
            <ListItem>
                <ListItemAvatar>
                    <Avatar
                        src=""
                        sx={{ width: 56, height: 56 }}
                    />
                </ListItemAvatar>

                <ListItemText
                    primary={"Lập trình hướng đối tượng"}
                    secondary={"13h30"}
                    sx={{ margin: "6px 15px 6px 15px" }}
                />

                <ListItemIcon>
                    <Box sx={{ m: 1, position: "relative" }}>
                        <Fab sx={{ mr: 2 }} color="info">
                            <CheckCircleIcon onClick={() => {props.setShow(true)}} />
                        </Fab>
                    </Box>
                </ListItemIcon>

            </ListItem>
        </>
    )
};


export default Schedule;