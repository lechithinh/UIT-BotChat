//React 
import React, { useState, forwardRef, useImperativeHandle, useContext} from "react";

//Components
import { OutlinedInput, InputLabel, FormControl} from "@mui/material";

//Global contents and dispatch from App
import { context, dispatch } from "../../App"

//keyboard
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

const TextEdit = (props, ref) => {

    //Global contents and dispatch
    const Contents = useContext(context)
    const Actions = useContext(dispatch)

    const [edit, toggleEdit] = useState(false);
    const [data, setData] = useState("");


    const HandleChange = (event) => {
        setData(event.target.value);
       
    };

    useImperativeHandle(ref, () => ({
        toggleEdit,
        getData: () => data,
        getEditState: () => edit,
        setData,
        HandleChange,
    }));



    return (
        <>

            {edit ? (
                <>


                <FormControl sx={{ width: "250px", '& .MuiOutlinedInput-input': { height: "1.7rem" }, '& .MuiInputLabel-root': { fontSize: "27px"}, '& .MuiOutlinedInput-root': {marginTop: "15px"} }}>
                    <InputLabel htmlFor="name-input">Nhập MSSV/GV</InputLabel>
                    <OutlinedInput
                        id="name-input"
                        onChange={HandleChange}
                        size="small"
                        value={data}
                        sx={{ my: 1 }}
                    />
                </FormControl>
                </>
                ) : props.user.uid}

               
        </>
    )
};

export default forwardRef(TextEdit);