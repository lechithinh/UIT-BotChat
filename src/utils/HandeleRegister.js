import axios from "axios";

const HandleRegister = (name, imgUrl) => {
    const formData = new FormData();
    formData.append('input_crop_path', imgUrl.split('/face/')[1])
    formData.append("name", name);
    axios
        .post(process.env.REACT_APP_RECOGNIZE_URL + "api/register-cropped-face", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((res) => {
            console.log("registration done!", res.data);
            return res.data;
        })
        .catch((err) => {
            console.error(err);
        });
};

export default HandleRegister;