
import axios from "axios";
import LessonCode from './LessonCode';

const HandleWeekTeacher = (res) => {
    const storage = []

    for (const item of res.data["data"]) {
        if (item["thu"] === "*") {
            continue;
        }
        const temp = []
        Object.keys(item).forEach(function (key) {
            if (key === "tenmh" || key === "thu" || key === "tiet" || key === "phonghoc") {
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
        if (subarr[2][0] === "1" || subarr[2][0] === "2" || subarr[2][0] === "3" || subarr[2][0] === "4" || subarr[2][0] === "5") {
            subarr[2] = "Sáng";
        }
        else {
            subarr[2] = "Chiều";
        }
    }

    const result = [
        ["2", [], []],
        ["3", [], []],
        ["4", [], []],
        ["5", [], []],
        ["6", [], []],
        ["7", [], []],
    ]

    for (const ele of storage) {
        if (ele[1] === "2") {
            if (ele[2] === "Sáng") {
                result[0][1].push(ele[0]);
            }
            else {
                result[0][2].push(ele[0]);
            }
        }
        else if (ele[1] === "3") {
            if (ele[2] === "Sáng") {
                result[1][1].push(ele[0]);
            }
            else {
                result[1][2].push(ele[0]);
            }
        }
        else if (ele[1] === "4") {
            if (ele[2] === "Sáng") {
                result[2][1].push(ele[0]);
            }
            else {
                result[2][2].push(ele[0]);
            }
        }
        else if (ele[1] === "5") {
            if (ele[2] === "Sáng") {
                result[3][1].push(ele[0]);
            }
            else {
                result[3][2].push(ele[0]);
            }
        }
        else if (ele[1] === "6") {
            if (ele[2] === "Sáng") {
                result[4][1].push(ele[0]);
            }
            else {
                result[4][2].push(ele[0]);
            }
        }
        else if (ele[1] === "7") {
            if (ele[2] === "Sáng") {
                result[5][1].push(ele[0]);
            }
            else {
                result[5][2].push(ele[0]);
            }
        }
    }


    return result;
}

const HandleWeekStudent = (res) => {
    Array.prototype.move = function (from, to) {
        this.splice(to, 0, this.splice(from, 1)[0]);
        return this;
    };


    const storage = []

    for (const item of res.data["data"]) {
        if (item["thu"] === "*") {
            continue;
        }
        const temp = []
        Object.keys(item).forEach(function (key) {
            if (key === "malop") {
                let code = item[key].split(".")
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
        if (subarr[2][0] === "1" || subarr[2][0] === "2" || subarr[2][0] === "3" || subarr[2][0] === "4" || subarr[2][0] === "5") {
            subarr[2] = "Sáng";
        }
        else {
            subarr[2] = "Chiều";
        }
    }

    const result = [
        ["2", [], []],
        ["3", [], []],
        ["4", [], []],
        ["5", [], []],
        ["6", [], []],
        ["7", [], []],
    ]

    for (const ele of storage) {
        if (ele[1] === "2") {
            if (ele[2] === "Sáng") {
                result[0][1].push(ele[0]);
            }
            else {
                result[0][2].push(ele[0]);
            }
        }
        else if (ele[1] === "3") {
            if (ele[2] === "Sáng") {
                result[1][1].push(ele[0]);
            }
            else {
                result[1][2].push(ele[0]);
            }
        }
        else if (ele[1] === "4") {
            if (ele[2] === "Sáng") {
                result[2][1].push(ele[0]);
            }
            else {
                result[2][2].push(ele[0]);
            }
        }
        else if (ele[1] === "5") {
            if (ele[2] === "Sáng") {
                result[3][1].push(ele[0]);
            }
            else {
                result[3][2].push(ele[0]);
            }
        }
        else if (ele[1] === "6") {
            if (ele[2] === "Sáng") {
                result[4][1].push(ele[0]);
            }
            else {
                result[4][2].push(ele[0]);
            }
        }
        else if (ele[1] === "7") {
            if (ele[2] === "Sáng") {
                result[5][1].push(ele[0]);
            }
            else {
                result[5][2].push(ele[0]);
            }
        }
    }

    return result;

}
const HandleWeekSchedule = (uid, res) => {
    if (isNumber(uid)) {
        return HandleWeekStudent(res)
    }
    else {
        return HandleWeekTeacher(res);
    }
}

const HandleForStudent = (res) => {
    Array.prototype.move = function (from, to) {
        this.splice(to, 0, this.splice(from, 1)[0]);
        return this;
    };


    const storage = []
    for (const item of res.data["data"]) {
        if (item["thu"] === "*") {
            continue;
        }
        const temp = []
        Object.keys(item).forEach(function (key) {
            if (key === "malop") {
                let code = item[key].split(".")
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


    const daySchedule = []
    var num = new Date().getDay();
    num += 1;
    let today = num.toString()
    for (const element of storage) {
        if (element[1] === today) {
            daySchedule.push(element);
        }
    }
    return daySchedule;
}
const HandleForTeacher = (res) => {
    const storage = []
    for (const item of res.data["data"]) {
        if (item["thu"] === "*") {
            continue;
        }
        const temp = []
        Object.keys(item).forEach(function (key) {
            if (key === "tenmh" || key === "thu" || key === "tiet" || key === "phonghoc") {
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


    const daySchedule = []
    var num = new Date().getDay();
    num += 1;
    let today = num.toString()
    for (const element of storage) {
        if (element[1] === today) {
            daySchedule.push(element);
        }
    }

    return daySchedule;
}

const HandleTodaySchedule = (uid, res) => {
    if (isNumber(uid)) {
        return HandleForStudent(res)
    }
    else {
        return HandleForTeacher(res);
    }
}

function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }

const GetSchedule = async (uid, hocky, namhoc) => {
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
        return { "today": daySchedule, "week": weekSchedule };
};

export default GetSchedule;
