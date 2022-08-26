const isFiveTipsUp = (multiHandLandmarks, width, height) => {
    // CODE FROM HERE
    const tipIds = [4, 8, 12, 16, 20];
    let lmList = [];
    let fingersUp = 0;
    let w = width;
    let h = height;

    for (const landmarks of multiHandLandmarks) {
        let index = 0;
        for (const landmark of landmarks) {
            //console.log(landmark);
            let cx = Math.floor(landmark["x"] * w);
            let cy = Math.floor(landmark["y"] * h);
            lmList.push([index, cx, cy]);
            index += 1;
        }
    }

    //thumb
    if (lmList[tipIds[0]]) {
        if (lmList[tipIds[0]].at(1) > lmList[tipIds[0] - 1].at(1)) {
            //thumbup
            fingersUp++;
        }
    }

    //the other fingers
    for (let id = 1; id <= 4; id++) {
        if (lmList[tipIds[id]]) {
            if (lmList[tipIds[id]].at(2) < lmList[tipIds[id] - 1].at(2) && lmList[tipIds[id] - 1].at(2) < lmList[tipIds[id] - 2].at(2) && lmList[tipIds[id] - 2].at(2) < lmList[tipIds[id] - 3].at(2)) {
                //fingers up
                fingersUp++;
            }
        }
    }

    console.log("Fingers up: ", fingersUp)
    return (fingersUp >= 4);
}

export default isFiveTipsUp;