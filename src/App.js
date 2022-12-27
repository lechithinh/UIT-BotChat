import "./App.css";
//Libaries
import * as cam from "@mediapipe/camera_utils";
import { drawLandmarks, drawRectangle } from "@mediapipe/drawing_utils";
import Webcam from "react-webcam";
import { FaceDetection } from "@mediapipe/face_detection";

//React
import React from "react";
import { useEffect, useRef, useState, createContext } from "react";

//Components
import Modal from "./components/Modal";
import Noti from "./components/Notifications";
import BackButton from "./components/BackButton";
import KeyBoard from "./components/KeyBoard"
//Modules

//Utils
import DataURLtoFile from "./utils/DataURLtoFile"
import PlayAudio from './utils/PlayAudio';
import { ClearSleepTime,SetSleepTime } from './utils/Redirect';
import axios from 'axios';

//Contexts
export const context = createContext(null);
export const dispatch = createContext(null);

function App() {
  const webCamRef = useRef(null);
  const canvasRef = useRef(null);

  //Ref to control process
  const inProcessRef = useRef(false);
  const timeIDRef = useRef(null);

  //Ref to control compoents
  const modalRef = useRef(null);
  const notiRef = useRef(null);
  const KeyboardRef = useRef(null);
  //Ref to control data
  const data = useRef([]);
  

  const screenSize = useRef({
    width: 0,
    height: 0,
  });

  var camera = null;

  useEffect(() => {
    const time_id = SetSleepTime()
    timeIDRef.current = time_id;
  },[])
 

  // Contents and Dispatch
  const Contents = useRef({
    data,
    inProcessRef,
    notiRef,
    timeIDRef,
  })

  const Actions = {
    //Process
    setProcess: (newProcess) => {
      inProcessRef.current = newProcess;
    },

    //Message
    setTimeID: (newID) => {timeIDRef.current = newID},
    setNotiMessage: (newNoti, newTime) => { notiRef.current.setMessage(newNoti, newTime)},
    setNotiShow: (isShow) => { notiRef.current.setshowNoti(isShow)},

    setName: (index, newName) => { data.current[index].name = newName },
    setUid: (index, newUid) => { data.current[index].uid = newUid },
    setPath: (index, newPath) => { data.current[index].path = newPath },
    setStatus: (index, newStatus) => { data.current[index].Status = newStatus },
    setDaySchedule: (index, newDaySchedule) => { data.current[index].DaySchedule = [].concat(newDaySchedule) },
    setWeekSchedule: (index, newWeekSchedule) => { data.current[index].WeekSchedule = [].concat(newWeekSchedule) },
    setWorkingValue: (index, value) => { data.current[index].working = value },
    setCurrentWorking: (index, value) => {
      for(const user of data.current)
      {
        if(user.uid == data.current[index].uid) {
          user.working = value;
        }
        else {
          user.working = false;
        }
      }
    },
    ResetUser: () => { data.current.length = 0},
    //for keyboard
    setShowKeyBoard: (val) => {
      KeyboardRef.current.setShow(val);
    },
    setKeyBoardInputCallBack: (cb, curText) => {
      KeyboardRef.current.setUpdateCb(cb, curText);
    },

  }

  async function onResults(results) {
    canvasRef.current.width = screenSize.current.width;
    canvasRef.current.height = screenSize.current.height;
    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");

    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(
      results.image,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );

    canvasCtx.drawImage(
      document.getElementById("img-frame"),
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );

    if (results.detections.length > 0) {
      drawRectangle(canvasCtx, results.detections[0].boundingBox, {
        color: "blue",
        lineWidth: 4,
        fillColor: "#00000000",
      });
      drawLandmarks(canvasCtx, results.detections[0].landmarks, {
        color: "red",
        radius: 5,
      });
    }

    if (results.detections.length > 0) {
      const size = canvasElement.height;
      const sHeight = results.detections[0].boundingBox["height"] * size;
      const sWidth = results.detections[0].boundingBox["width"] * size;

      // Show Notifications Condition
      if (sHeight < 120 && sWidth < 90 && !inProcessRef.current) {
        setTimeout(() => {
          notiRef.current.setshowNoti(true);
        }, 1500);
      }

      //Process Condition
      if (sHeight > 120 && sWidth > 90 && !inProcessRef.current) {
        inProcessRef.current = true;
        let file = DataURLtoFile(webCamRef.current.getScreenshot(), `${1}.jpeg`);

        //API Face Recognition
        const formData = new FormData();
        formData.append("files", file);
        axios
          .post(process.env.REACT_APP_RECOGNIZE_URL + "api/recognize", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }).then((res) => {
              for(const user of res['data'])
              {
                let name_api = "Người mới";
                let text = "";
                let path = "https://api.mmlab.uit.edu.vn/face/" + user["path"];;
                let uid = 'MSSV/GV';
                if(user['name'] != '')
                {
                  name_api = user['name'].split('-')[0];
                  text = user['name'].split('-')[1];
                  uid = '';
                  if (text) {
                    for (let i = 1; i < text.length; i++) {
                      uid += text[i];
                      if (text[i + 1] == "@") { break }
                    }
                  }
                  PlayAudio("schedule");
                }
                data.current.push(
                  {
                    "name": name_api,
                    "uid": uid,
                    "path": path,
                    "DaySchedule": [],
                    "WeekSchedule": [],
                    "Status": "",
                    "working": false,
                  }
                )
                PlayAudio("schedule");
              }
              notiRef.current.setshowNoti(false);
              modalRef.current.setshowModal(true);
              modalRef.current.setStep(1);
              ClearSleepTime(timeIDRef.current);
          }) 
      }
    }

    
    canvasCtx.restore();
  }

  useEffect(() => {
    const { innerWidth: w, innerHeight: h } = window;
    const minSize = Math.min(w, h);

    if (minSize === w) {
      screenSize.current.width = w;
      screenSize.current.height = (3 / 4) * w;
    } else {
      screenSize.current.height = h;
      screenSize.current.width = h * (4 / 3);
    }
    const faceDetection = new FaceDetection({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`;
      },
    });

    faceDetection.setOptions({
      selfieMode: true,
      model: "short",
      minDetectionConfidence: 0.65,
    });

    faceDetection.onResults(onResults);

    if (
      typeof webCamRef.current !== "undefined" &&
      webCamRef.current !== null
    ) {
      camera = new cam.Camera(webCamRef.current.video, {
        onFrame: async () => {
          await faceDetection.send({ image: webCamRef.current.video });
        },
        width: 640,
        height: 480,
      });
    }

    camera.start();
  }, []);

  return (
    <div className="App">
      <context.Provider value={Contents}>
        <dispatch.Provider value={Actions}>
          {/* Input Video */}
          <Webcam ref={webCamRef} style={{ visibility: "hidden", position: "absolute" }} mirrored={true} />
          
          {/* Go Back Button */}
          <BackButton />

          {/* Main Modal */}
          <Modal ref={modalRef} />

          {/* Output Video */}
          <canvas
            ref={canvasRef}
            style={{ marginTop: "35%" }}
          ></canvas>

          {/* Notifications */}
          <Noti ref={notiRef} />

          {/*Key board*/}
          <KeyBoard ref={KeyboardRef} />

        </dispatch.Provider>
      </context.Provider>
    </div>
  );
}

export default App;
