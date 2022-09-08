//React 
import React, { useState, forwardRef, useImperativeHandle, useContext} from "react";

//Components
import { OutlinedInput, InputLabel, FormControl} from "@mui/material";

//Global contents and dispatch from App
import { context, dispatch } from "../../App"

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
    }));


    return (
        <>
            {edit ? (
                <FormControl sx={{ width: "200px", '& .MuiOutlinedInput-input': { height: "2em" }, '& .MuiInputLabel-root': {fontSize: "25px"} }}>
                    <InputLabel htmlFor="name-input">MSSV/GV</InputLabel>
                    <OutlinedInput
                        id="name-input"
                        onChange={HandleChange}
                        size="small"
                        value={data}
                        sx={{ my: 1 }}
                    />
                </FormControl>) : Contents.current.dataRef.current.uid}
        </>
    )
};

export default forwardRef(TextEdit);