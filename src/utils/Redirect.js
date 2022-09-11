const SetSleepTime = (sec = 40, url = "http://map.mmlab.uit.edu.vn/") => {
    console.log("sleep");
    const id = window.setTimeout(() => {
        window.location.replace(url);
    }, sec * 1000);
    return id;
};

const ClearSleepTime = (id) => {
    console.log("wake up");
    window.clearTimeout(id);
};

const ClearAllTimeOut = () => {
    var id = window.setTimeout(function () { }, 0);

    while (id--) {
        window.clearTimeout(id); // will do nothing if no timeout with id is present
    }
};

export { SetSleepTime, ClearSleepTime, ClearAllTimeOut };