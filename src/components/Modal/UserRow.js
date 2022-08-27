import React from "react";
import { Box, Fab } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import { ListItem, ListItemAvatar, ListItemText, ListItemIcon } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const UserRow = (props) => {
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
                    primary={props['user'].name}
                    secondary={props['user'].MSSV}
                    sx={{ margin: "6px 15px 6px 15px" }}
                />

                <ListItemIcon>
                    <Box sx={{ m: 1, position: "relative" }}>
                        <Fab>
                            <EditIcon />
                        </Fab>
                    </Box>
                </ListItemIcon>

            </ListItem>
        </>
    )
}; 

export default UserRow;