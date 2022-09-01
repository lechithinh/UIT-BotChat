import React, { useState } from "react";

const TextEdit = () => {
    const [edit, setEdit] = useState(false);
    const [data, setData] = useState("");

    const handlEdit = () => {
        
    }
    return (
        <>
            {edit ? <input onChange={handlEdit}/> : <h1>ReadOnly</h1>}
        </>
    )
};

export default TextEdit;