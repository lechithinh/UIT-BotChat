import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from "react";
import "react-simple-keyboard/build/css/index.css";
import Keyboard from "react-simple-keyboard";
import { Fade } from "@mui/material";

const KeyBoard = (props, ref) => {
    const [show, setShow] = useState(false);
    const [input, setInput] = useState("");
    const [layout, setLayout] = useState("default");
    const callback = useRef(null); // function to set state of input field
    const KeyboardRef = useRef(null);
    

    useImperativeHandle(ref, () => ({
        setShow,
        updateInput,
        getInput,
        setUpdateCb: (cb, text) => {
            callback.current = cb;
            updateInput(text);
        },
    }));

    useEffect(() => {
        if (callback.current !== null) {
            callback.current(input); // update input value for text field
        }
    }, [input]);

    const onChange = (input) => {
        setInput(input);
        // console.log(input);
    };

    const updateInput = (value) => {
        KeyboardRef.current.setInput(value);
        setInput(value);
    };

    const handleShift = () => {
        const newLayoutName = layout === "default" ? "shift" : "default";
        setLayout(newLayoutName);
    };

    const onKeyPress = (button) => {
        /**
         * If you want to handle the shift and caps lock buttons
         */
        if (button === "{shift}" || button === "{lock}") handleShift();
    };

    const getInput = () => input;

    return (
        <Fade in={show} timeout={500}>
            <div
                style={{ position: "absolute", top: "77vh", width: "100vw", zIndex: 1000 }}
                onMouseDown={(e) => {
                    e.preventDefault();
                }}
            >
                <Keyboard
                    layoutName={layout}
                    onChange={onChange}
                    keyboardRef={(r) => (KeyboardRef.current = r)}
                    onKeyPress={onKeyPress}
                />
            </div>
        </Fade>
    );
};

export default forwardRef(KeyBoard);
