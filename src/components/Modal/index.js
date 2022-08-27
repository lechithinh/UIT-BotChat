import React from "react";
import { useState, useImperativeHandle, forwardRef } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from "@mui/material";
import { Button } from "@mui/material"
import { Box, Fab } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import { ListItem, ListItemAvatar, ListItemText, ListItemIcon } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const API = [
    {
        "name": "Lê Chí Thịnh",
        "gmail": "lechithinh.developer@gmail.com",
        "sim": 78,
        "MSSV": 21522634,
    }
]
const Modal = (props, ref) => {
    const [showModal, setshowModal] = useState(false);


    useImperativeHandle(ref, () => ({
        setshowModal,
    }));

    return (
        <>
            <Dialog open={showModal} onClose={() => { setshowModal(!showModal) }}>
                <DialogTitle>
                    Bạn có phải là
                </DialogTitle>
                <DialogContent> 

                    {/* DISPLAY PREDICTION */}
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar
                                src=""
                                sx={{ width: 56, height: 56 }}
                            />
                        </ListItemAvatar>

                        <ListItemText
                            primary={API[0].name}
                            secondary={API[0].MSSV}
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


                </DialogContent>
                <DialogActions>
                    <Button variant="outlined">Đăng kí người mới</Button>
                </DialogActions>
            </Dialog>
        </>
    )
};

export default forwardRef(Modal); 