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
                <FormControl sx={{ width: "200px", '& .MuiOutlinedInput-input': { height: "1.7rem" }, '& .MuiInputLabel-root': { fontSize: "27px"}, '& .MuiOutlinedInput-root': {marginTop: "15px"} }}>
                    <InputLabel htmlFor="name-input">MSSV/GV</InputLabel>
                    <OutlinedInput
                        id="name-input"
                        onChange={HandleChange}
                        size="small"
                        value={data}
                        sx={{ my: 1 }}
                    />
                </FormControl>) : props.user.uid}
        </>
    )
};

export default forwardRef(TextEdit);