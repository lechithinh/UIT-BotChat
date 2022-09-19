//React
import React, { useState, useRef, useContext, useEffect, useReducer, forwardRef, useImperativeHandle } from "react";

//Libaries
import axios from "axios";

//Components
import { Box, Fab } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import { ListItem, ListItemAvatar, ListItemText, ListItemIcon } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Alert from '@mui/material/Alert';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
//Sub components
import TextEdit from "./Textedit";
import DaySchedule from "./DaySchedule";
import WeekSchedule from "./WeekSchedule"

//Utils
import GetNameById from "../../utils/GetNameById";
import PlayAudio from "../../utils/PlayAudio";
import HandleRegister from "../../utils/HandeleRegister";
import GetSchedule from "../../utils/GetSchedule";

//Global contents and dispatch from App
import { context, dispatch } from "../../App"



function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }

const CheckUID = (uid) => {
    if(isNumber(uid)){
        return uid + STUDENT_GMAIL;
    }
    else{
        return uid.toLowerCase() + TEACHER_GMAIL;
    }
}

const INVALID_ID = "ID không hợp lệ!"
const VALID_ID = "ID hợp lệ!"
const STUDENT_GMAIL = "@gm.uit.edu.vn";
const TEACHER_GMAIL = "@uit.edu.vn"


const UserRow = (props, ref) => {
    
    //Global contents and dispatch
    const Contents = useContext(context)
    const Actions = useContext(dispatch)
    const currentTime = new Date().toLocaleString();
    const [showDay, setshowDay] = useState(false);
    const [showWeek, setshowWeek] = useState(false)
    const [showIcon, setshowIcon] = useState(true);
    const [showEditIcon, setshowEditIcon] = useState(true);
    const [showTime, setShowTime] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    
   

    //Ref to control sub components
    const editRef = useRef(null);
   

    
    // OnClick Edit Button
    const HandleEditButton = () => {
        Actions.setName(props.index, "")
        editRef.current.toggleEdit(true); 
        setshowIcon(true);
        setshowEditIcon(false);
        setShowAlert(false);
        PlayAudio("edit")
    }

    //OnClick Save Button
    const HandleSaveButton = async () => {
        Actions.setUid(props.index, editRef.current.getData());
        const getNameData = await GetNameById(editRef.current.getData());
        if (getNameData.code === 0 || getNameData.data.hoten === null){ //ID không hợp lệ 
            Actions.setStatus(props.index, INVALID_ID)
            setShowAlert(true);
            setshowIcon(true);
            setshowEditIcon(true);
            PlayAudio('errorsave')
        }
        else{
            const email = CheckUID(editRef.current.getData());
            Actions.setStatus(props.index, VALID_ID)
            const newName = getNameData.data.hoten;
            Actions.setName(props.index, newName);
            const newUid = editRef.current.getData();
            Actions.setUid(props.index, newUid);

            //Call API Schedule
            const schedule = await GetSchedule(props.user.uid, 1, 2022);
            Actions.setDaySchedule(props.index, schedule.today)
            Actions.setWeekSchedule(props.index, schedule.week)

            //Upload to API register
            HandleRegister(newName + ' - ' + email, props.user.path);
            
            setShowAlert(false);
            setshowIcon(true);
            setshowEditIcon(true);
            PlayAudio('save')
            
        }
        editRef.current.toggleEdit(false);
        
    }
   

    useEffect(()=>{
        console.log("Re-render")
    })

    const CheckTKB = async () => {
        Actions.setCurrentWorking(props.index, true);
        if (props.user.DaySchedule.length === 0)
        {
            Actions.setStatus(props.index, "Hôm nay bạn trống lịch");
            setShowAlert(true);
            PlayAudio('noschedule');
        }

        if (props.user.DaySchedule.length > 10) {
            Actions.setStatus(props.index, INVALID_ID);
            setshowDay(false);
            setShowAlert(true);
        }
        else{

            //Re-render main components
            props.setRender(!props.render)
            props.setStep(2);
        }


       
    }

    const HandleHide = () => {
        setshowDay(false);
        setshowWeek(false);
        setshowIcon(true);
        setshowEditIcon(true);
        setShowAlert(false);
        Actions.setWorkingValue(props.index, false);
        props.setStep(1);
    }
    

    //Use current variable to control 1 viewer at the same time
    useEffect(() => {
        if (props.user.working )
        {
            if (props.user.Status != INVALID_ID)
            {
                setshowDay(true);
                setshowWeek(true);
                setshowIcon(false);
            }
            else{
                setshowDay(false);
                setshowWeek(false);
                setshowIcon(false);
                setShowAlert(true);
            }
            
        }
        else{
            setshowIcon(true);
            setshowEditIcon(true);
            setshowDay(false);
            setshowWeek(false);
            setShowAlert(false);
        }
    }, [props.user.working])
    

    return (
        <>
            {/* USER INFOR */} 

            <ListItem sx={{ backgroundColor: props.user.working ? "#DEE9F3" : "white"}}>

                {/* AVATATAR */}
                <ListItemAvatar>
                    <Avatar
                        src={props.user.path}
                        sx={{ width: 56, height: 56 }}
                    />
                </ListItemAvatar>

                {/* NAME vs uid */}
                <ListItemText
                    primary={props.user.name} 
                    secondary={<TextEdit user={props.user} ref={editRef}/>} 
                    sx={{ margin: "5px 15px 2px 20px", '& .MuiTypography-root':{fontSize: "25px", fontWeight: 600}}}
                />

                {/* EDIT vs SAVE ICON */}
                {showIcon ? 
                    (<ListItemIcon sx={{ '& .MuiButtonBase-root': { fontWeight: 500, width: "180px", fontSize: "1.2rem" }}}>
                        {showEditIcon ? 
                        <>
                            <Fab variant="extended" color={props.user.Status === INVALID_ID ? "error" : "default"} onClick={HandleEditButton}>
                            <EditIcon sx={{ mr: 2}} />
                            {props.user.name === "Người mới" ? "Đăng kí" : "Chỉnh sửa"}
                        </Fab>

                                <Fab variant="extended" color={'success'} sx={{ ml: 3 }} onClick={CheckTKB} disabled={props.user.Status === INVALID_ID || props.user.name === "Người mới" || props.user.uid === '' ? true : false}>
                                <CalendarMonthIcon sx={{ mr: 1 }} /> 
                                Xem lịch
                        </Fab>
                        </>
                        :  
                        <Fab variant="extended" color={"success"} sx={{ padding: "20px" }} onClick={HandleSaveButton}>
                            <SaveIcon sx={{ mr: 2 }} />
                            Lưu
                        </Fab>}
                </ListItemIcon>)
                :
                <ListItemIcon sx={{ '& .MuiButtonBase-root': { fontWeight: 500, width: "150px" } }}>
                        <Fab variant="extended" color={'success'} sx={{ ml: 3 }} onClick={HandleHide}>
                            <CalendarMonthIcon sx={{ mr: 1 }} />
                            Ẩn
                        </Fab>
                </ListItemIcon>
                   
                }

                {/* SHOWTIME */}
                {/* {state.showTime && <h2 style={{ paddingTop: '2rem'}}>{currentTime}</h2>} */}

                
            </ListItem>

            {/* ALERT */}
            {showAlert && 
            <Alert 
                sx={{ mt: 2, mb: 2, '& .MuiAlert-message': { fontSize: '1.7rem' }, '& .MuiAlert-icon': {marginTop: "4px", fontSize: "35px"} }} 
                variant="standard" 
                severity={props.user.Status === INVALID_ID ? "error" : "info"}>
                {props.user.Status}
            </Alert>}
                    
            {/* SCHEDULE */}
            {showDay && <DaySchedule user={props.user}/>}
            {showWeek && <WeekSchedule user={props.user} /> }
        </>
    )
}; 

export default UserRow;