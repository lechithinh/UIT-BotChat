const md5 = require("md5");
const axios = require("axios");

module.exports = {
  GetNameById: async (username) => {
    const $pkey = "IL@_};uE7<kUitt!";
    const time = new Date().getTime();
    const data = JSON.stringify({
      time: time,
      hash: md5(username + time + $pkey),
    });
    const config = {
      method: "post",
      url: `https://apiservice.uit.edu.vn/iot/att/user-info/${username}.json`,
      headers: {
        "Content-Type": "application/json",
        Cookie:
          "SSESSbb01d9a0f90d4363b1d5ca1a35c4c20b=DTQtRsJXMHj0Dku_7e68uDDViP356KMi65DGmaYpzoo",
      },
      data: data,
    };
    const res = await axios(config);
    console.log(res.data);
    return res.data;
  },
};
