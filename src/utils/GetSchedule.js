import axios from "axios";
import LessonCode from "./LessonCode";

const removeDuplicates = (arr = []) => {
  const map = new Map();
  arr.forEach((x) => map.set(JSON.stringify(x), x));
  arr = [...map.values()];
  return arr;
};
//Week
const HandleWeekTeacher = (res) => {
  const storage = [];

  for (const item of res.data["data"]) {
    if (item["thu"] === "*") {
      continue;
    }
    const temp = [];
    Object.keys(item).forEach(function (key) {
      if (
        key === "tenmh" ||
        key === "thu" ||
        key === "tiet" ||
        key === "phonghoc"
      ) {
        temp.push(item[key]);
      }
    });
    storage.push(temp);
  }

  for (let i = 0; i < storage.length; i++) {
    for (let j = 0; j < storage.length; j++) {
      const thu1 = parseInt(storage[i][1]);
      const thu2 = parseInt(storage[j][1]);
      if (thu1 < thu2) {
        let t = storage[i];
        storage[i] = storage[j];
        storage[j] = t;
      }
    }
  }

  for (const subarr of storage) {
    if (
      subarr[2][0] === "1" ||
      subarr[2][0] === "2" ||
      subarr[2][0] === "3" ||
      subarr[2][0] === "4" ||
      subarr[2][0] === "5"
    ) {
      subarr[2] = "S";
    } else {
      subarr[2] = "C";
    }
  }

  const result = [
    ["2", [], []],
    ["3", [], []],
    ["4", [], []],
    ["5", [], []],
    ["6", [], []],
    ["7", [], []],
  ];

  let storage_new = removeDuplicates(storage);

  for (const ele of storage_new) {
    if (ele[1] === "2") {
      if (ele[2] === "S") {
        result[0][1].push(ele[0]);
      } else {
        result[0][2].push(ele[0]);
      }
    } else if (ele[1] === "3") {
      if (ele[2] === "S") {
        result[1][1].push(ele[0]);
      } else {
        result[1][2].push(ele[0]);
      }
    } else if (ele[1] === "4") {
      if (ele[2] === "S") {
        result[2][1].push(ele[0]);
      } else {
        result[2][2].push(ele[0]);
      }
    } else if (ele[1] === "5") {
      if (ele[2] === "S") {
        result[3][1].push(ele[0]);
      } else {
        result[3][2].push(ele[0]);
      }
    } else if (ele[1] === "6") {
      if (ele[2] === "S") {
        result[4][1].push(ele[0]);
      } else {
        result[4][2].push(ele[0]);
      }
    } else if (ele[1] === "7") {
      if (ele[2] === "S") {
        result[5][1].push(ele[0]);
      } else {
        result[5][2].push(ele[0]);
      }
    }
  }

  return result;
};
const HandleWeekStudent = (res) => {
  Array.prototype.move = function (from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
    return this;
  };

  const storage = [];

  for (const item of res.data["data"]) {
    if (item["thu"] === "*") {
      continue;
    }
    const temp = [];
    Object.keys(item).forEach(function (key) {
      if (key === "malop") {
        let code = item[key].split(".");
        temp.push(LessonCode[code[0]]);
      }

      if (key === "thu" || key === "tiet" || key === "phonghoc") {
        temp.push(item[key]);
      }
    });
    storage.push(temp);
  }

  for (const obj of storage) {
    obj.move(2, 0);
    obj.move(2, 3);
  }

  for (let i = 0; i < storage.length; i++) {
    for (let j = 0; j < storage.length; j++) {
      const thu1 = parseInt(storage[i][1]);
      const thu2 = parseInt(storage[j][1]);
      if (thu1 < thu2) {
        let t = storage[i];
        storage[i] = storage[j];
        storage[j] = t;
      }
    }
  }

  for (const subarr of storage) {
    if (
      subarr[2][0] === "1" ||
      subarr[2][0] === "2" ||
      subarr[2][0] === "3" ||
      subarr[2][0] === "4" ||
      subarr[2][0] === "5"
    ) {
      subarr[2] = "S";
    } else {
      subarr[2] = "C";
    }
  }

  // remove duplicate data
  let storage_new = removeDuplicates(storage);

  const result = [
    ["2", [], []],
    ["3", [], []],
    ["4", [], []],
    ["5", [], []],
    ["6", [], []],
    ["7", [], []],
  ];

  for (const ele of storage_new) {
    if (ele[1] === "2") {
      if (ele[2] === "S") {
        result[0][1].push(ele[0]);
      } else {
        result[0][2].push(ele[0]);
      }
    } else if (ele[1] === "3") {
      if (ele[2] === "S") {
        result[1][1].push(ele[0]);
      } else {
        result[1][2].push(ele[0]);
      }
    } else if (ele[1] === "4") {
      if (ele[2] === "S") {
        result[2][1].push(ele[0]);
      } else {
        result[2][2].push(ele[0]);
      }
    } else if (ele[1] === "5") {
      if (ele[2] === "S") {
        result[3][1].push(ele[0]);
      } else {
        result[3][2].push(ele[0]);
      }
    } else if (ele[1] === "6") {
      if (ele[2] === "S") {
        result[4][1].push(ele[0]);
      } else {
        result[4][2].push(ele[0]);
      }
    } else if (ele[1] === "7") {
      if (ele[2] === "S") {
        result[5][1].push(ele[0]);
      } else {
        result[5][2].push(ele[0]);
      }
    }
  }

  return result;
};
const HandleWeekSchedule = (uid, res) => {
  if (isNumber(uid)) {
    return HandleWeekStudent(res);
  } else {
    return HandleWeekTeacher(res);
  }
};

//Day
const HandleForStudent = (res) => {
  Array.prototype.move = function (from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
    return this;
  };

  const storage = [];
  for (const item of res.data["data"]) {
    if (item["thu"] === "*") {
      continue;
    }
    const temp = [];
    Object.keys(item).forEach(function (key) {
      if (key === "malop") {
        let code = item[key].split(".");
        temp.push(LessonCode[code[0]]);
      }

      if (key === "thu" || key === "tiet" || key === "phonghoc") {
        temp.push(item[key]);
      }
    });
    storage.push(temp);
  }

  for (const obj of storage) {
    obj.move(2, 0);
    obj.move(2, 3);
  }

  for (let i = 0; i < storage.length; i++) {
    for (let j = 0; j < storage.length; j++) {
      const thu1 = parseInt(storage[i][1]);
      const thu2 = parseInt(storage[j][1]);
      if (thu1 < thu2) {
        let t = storage[i];
        storage[i] = storage[j];
        storage[j] = t;
      }
    }
  }

  const daySchedule = [];
  var num = new Date().getDay();
  num += 1;
  let today = num.toString();
  let storage_new = removeDuplicates(storage);
  for (const element of storage_new) {
    if (element[1] === today) {
      daySchedule.push(element);
    }
  }

  console.log("day", daySchedule);
  return daySchedule;
};
const HandleForTeacher = (res) => {
  const storage = [];
  for (const item of res.data["data"]) {
    if (item["thu"] === "*") {
      continue;
    }
    const temp = [];
    Object.keys(item).forEach(function (key) {
      if (
        key === "tenmh" ||
        key === "thu" ||
        key === "tiet" ||
        key === "phonghoc"
      ) {
        temp.push(item[key]);
      }
    });
    storage.push(temp);
  }

  for (let i = 0; i < storage.length; i++) {
    for (let j = 0; j < storage.length; j++) {
      const thu1 = parseInt(storage[i][1]);
      const thu2 = parseInt(storage[j][1]);
      if (thu1 < thu2) {
        let t = storage[i];
        storage[i] = storage[j];
        storage[j] = t;
      }
    }
  }

  const daySchedule = [];
  var num = new Date().getDay();
  num += 1;
  let today = num.toString();
  let storage_new = removeDuplicates(storage);
  for (const element of storage_new) {
    if (element[1] === today) {
      daySchedule.push(element);
    }
  }

  return daySchedule;
};

const HandleTodaySchedule = (uid, res) => {
  if (isNumber(uid)) {
    return HandleForStudent(res);
  } else {
    return HandleForTeacher(res);
  }
};

function isNumber(n) {
  return !isNaN(parseFloat(n)) && !isNaN(n - 0);
}

const GetSchedule = async (uid) => {
  const namhoc = new Date().getFullYear();
  const month = new Date().getMonth();
  const HK1 = [9, 10, 11, 12, 1];
  const HK2 = [2, 3, 4, 5, 6, 7];
  const hocky = HK1.includes(month) ? 1 : HK2.includes(month) ? 2 : 3;

  const url = "https://api.mmlab.uit.edu.vn/calendar/";

  const data = JSON.stringify({
    uid,
    hocky,
    namhoc,
  });

  const config = {
    method: "post",
    url: url + "get-schedule",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  const res = await axios(config);
  const weekSchedule = HandleWeekSchedule(uid, res);
  const daySchedule = HandleTodaySchedule(uid, res);
  return { today: daySchedule, week: weekSchedule };
};

export default GetSchedule;
