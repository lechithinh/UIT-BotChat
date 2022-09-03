import './App.css';
//Libaries
import * as cam from "@mediapipe/camera_utils";
import { drawLandmarks, drawRectangle } from "@mediapipe/drawing_utils";
import Webcam from "react-webcam";
import { FaceDetection } from "@mediapipe/face_detection";

//React 
import React from 'react';
import {useEffect,useRef,useState, createContext} from 'react'


//Components
import Modal from './components/Modal';
import Noti from './components/Notifications';
import BackButton from './components/BackButton';
//Modules



//Utils
import DataURLtoFile from "./utils/DataURLtoFile"
import axios from 'axios';

export const context = createContext(null); 
export const dispatch = createContext(null);

const InitData = {
    "name": "Người mới",
    "uid" : "id",
    "path": "https://previews.123rf.com/images/rido/rido1204/rido120400047/13283722-happy-smiling-guy-showing-thumb-up-hand-sign-isolated-on-white-background.jpg",
    "DaySchedule": [],
    "WeekSchedule": [],
  }




function App() {
  
  const webCamRef = useRef(null);
  const canvasRef = useRef(null);

  //Ref to control process
  const inProcessRef = useRef(false);


  //Ref to control compoents
  const modalRef = useRef(null);
  const notiRef = useRef(null);

  //Ref to control data
  const dataRef = useRef(InitData); 

  const screenSize = useRef({
    width: 0,
    height: 0,
  });

  var camera = null;
  const img = new Image();
  img.src = require("./Banner.png")

  // Contents and Dispatch
  const Contents = useRef({
    dataRef,
  })

  const Actions = {
    setName: (newName) => {dataRef.current.name = newName},
    setUid: (newUid) => {dataRef.current.uid = newUid}, 
    setPath: (newPath) => {dataRef.current.path = newPath},
    setDaySchedule: (newDaySchedule) => { dataRef.current.DaySchedule = [].concat(newDaySchedule)},
    setWeekSchedule: (newWeekSchedule) => { dataRef.current.WeekSchedule = [].concat(newWeekSchedule) }
  }

  async function onResults(results){
    canvasRef.current.width = screenSize.current.width;
    canvasRef.current.height = screenSize.current.height;
    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");

    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(img, 0, 0, canvasElement.width, canvasElement.height);
    

    if (results.detections.length > 0) {
      drawRectangle(canvasCtx, results.detections[0].boundingBox, { color: 'blue', lineWidth: 4, fillColor: '#00000000' });
      drawLandmarks(canvasCtx, results.detections[0].landmarks, { color: 'red', radius: 5, });
    }

  

    if (results.detections.length > 0) {
      const size = canvasElement.height;
      const sHeight = results.detections[0].boundingBox["height"] * size;
      const sWidth = results.detections[0].boundingBox["width"] * size;
      

      // Show Notifications Condition
      if (sHeight < 300 && sWidth < 255 && !inProcessRef.current){
        setTimeout(()=>{
          notiRef.current.setshowNoti(true);
        },1500);
        
      }
      
      //Process Condition
      if (sHeight > 300 && sWidth > 225 && !inProcessRef.current) {
        inProcessRef.current = true;
        let file = DataURLtoFile(webCamRef.current.getScreenshot(), `${1}.jpeg`);
        console.log("file: ", file)

        //API Face Recognition
        const formData = new FormData();
        formData.append("files", file);
        axios
          .post(process.env.REACT_APP_RECOGNIZE_URL + "api/recognize", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }).then((res) => {
              if(res["data"][0])
              {
                if (res["data"][0]["name"] != '')
                {
                  dataRef.current.name = res["data"][0]["name"].split("-")[0];
              
                  const text = res["data"][0]["name"].split("-")[1];
                  let uid = '';
                  if(text){
                    for (let i = 1; i < text.length; i++) {
                      uid += text[i];
                      if (text[i + 1] == "@") { break }
                    }
                    dataRef.current.uid = uid;
                  }

                }
                else{
                  dataRef.current.name = "Người mới";
                  dataRef.current.uid ="Nhập ID"
                }
 
                dataRef.current.path = "https://api.mmlab.uit.edu.vn/face/" + res["data"][0]["path"];
              }
      
              notiRef.current.setshowNoti(false);
              modalRef.current.setshowModal(true);
          }) 
      }
    }
  
      // Auto Close Condiction (On Work)
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
      minDetectionConfidence: 0.7
    });

    faceDetection.onResults(onResults);

    if (typeof webCamRef.current !== "undefined" && webCamRef.current !== null) {
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
          <Webcam ref={webCamRef} style={{ visibility: "hidden", position: "absolute" }} />
          
          {/* Go Back Button */}
          <BackButton />

          {/* Output Video */}
          <canvas ref={canvasRef} style={{ position: "absolute", top : "100px", left: "0"}}></canvas>
         
          {/* Notifications */}
          <Noti ref={notiRef} />

          {/* Main Modal */}
          <Modal ref={modalRef} />

        </dispatch.Provider>
      </context.Provider>

    </div>
  );
}

export default App;
