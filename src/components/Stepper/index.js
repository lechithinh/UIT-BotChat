import React from "react";
import { styled } from "@mui/material/styles";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import StepConnector, {
    stepConnectorClasses,
} from "@mui/material/StepConnector";
import { Typography } from "@mui/material";
import { fontSize } from "@mui/system";


const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 7,
        border: 0,
        backgroundColor:
            theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
        borderRadius: 1,
    },
}));

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
    backgroundColor:
        theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
    zIndex: 3,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    ...(ownerState.active && {
        backgroundImage:
            "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
        boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    }),
    ...(ownerState.completed && {
        backgroundImage:
            "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    }),
}));

function ColorlibStepIcon(props) {
    const { active, completed, className } = props;

    const icons = {
        1: <PersonSearchIcon sx={{ scale: '1.5' }} />,
        2: <ImageSearchIcon sx={{ scale: '1.4' }} />,
        3: <CalendarMonthIcon sx={{ scale: '1.4' }} />,
    };

    return (
        <ColorlibStepIconRoot
            ownerState={{ completed, active }}
            className={className}
            sx={{ scale: '1.5' }}
        >
            {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
}

const CustomStepper = ({ steps, activeStep, setActiveStep }) => {
    const HandleProgress = (index) => {
        setActiveStep(index);
    }
    return (
        <Stepper
            alternativeLabel
            activeStep={activeStep}
            connector={<ColorlibConnector />}
            style={{ marginTop: "100px", width: "950px", marginLeft: "50px"}}
        >
            {steps.map((label,index) => (
                <Step key={label}>
                    <StepLabel StepIconComponent={ColorlibStepIcon} onClick={() => {HandleProgress(index)}}>
                        <h1 style={{fontSize: "40px"}}><b>{label}</b></h1>   
                    </StepLabel>
                </Step>
            ))}
        </Stepper>
    );
};

export default CustomStepper;