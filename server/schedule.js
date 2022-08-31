var axios = require('axios');
var md5 = require('md5')

module.exports = {
    getSchedule: async(uid, hocky, namhoc) => {
        var key = "IL@_};uE7<hdJ!";
        var date = + Date.now()
        let hashStr = md5(uid + date + key)
        var data = JSON.stringify({
          "time": date,
          "hash": hashStr, //md5($uid . $time . $pkey)
          "hocky": hocky,
          "namhoc": namhoc,
          "uid": uid // Mã Giảng viên hoặc Mã sinh viên
        });
        var config = {
          method: 'post',
          url: 'https://apiservice.uit.edu.vn/iot/att/tkb',
          headers: { 
            'Content-Type': 'application/json', 
            'Cookie': 'SSESSbb01d9a0f90d4363b1d5ca1a35c4c20b=STF8Y9dg1pyopHOq6UjUoizcMpoWFt6BeaVRj8GPB6k'
          },
          data : data
        };
        const res = await axios(config)
        
        return res.data;
    }
}
