const axios = require("axios");

const GetNameById = async (username) => {
  const url = "https://api.mmlab.uit.edu.vn/calendar/";
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
  return res.data;
};

export default GetNameById;