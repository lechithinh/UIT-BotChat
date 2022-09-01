const axios = require("axios");

const GetNameById = async (username) => {
    const url = "http://localhost:3001/";
    const data = JSON.stringify({
        username,
    });
    const config = {
        method: "post",
        url: url + "get-name",
        headers: {
            "Content-Type": "application/json",
        },
        data: data,
    };
    const res = await axios(config);
    console.log(res.data);
    return res.data;
};

export default GetNameById;