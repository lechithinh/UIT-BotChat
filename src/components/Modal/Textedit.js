//React 
import React, { useState, forwardRef, useImperativeHandle } from "react";

//Components
import { OutlinedInput, InputLabel, FormControl} from "@mui/material";

const TextEdit = (props, ref) => {
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
                <FormControl sx={{ width: "170px" }}>
                    <InputLabel htmlFor="name-input">ID</InputLabel>
                    <OutlinedInput
                        id="name-input"
                        onChange={HandleChange}
                        size="small"
                        value={data}
                        sx={{ my: 1 }}
                    />
                </FormControl>) : props["user"].uid}
        </>
    )
};

export default forwardRef(TextEdit);