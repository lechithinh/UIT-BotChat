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

//Modules



//Utils
import DataURLtoFile from "./utils/DataURLtoFile"
import axios from 'axios';

export const context = createContext(null); 
export const dispatch = createContext(null);

const InitData = {
    "name": "Tên mặc định",
    "gmail": "tiepnv",
    "MSSV": 21522634,
    "path": "https://previews.123rf.com/images/rido/rido1204/rido120400047/13283722-happy-smiling-guy-showing-thumb-up-hand-sign-isolated-on-white-background.jpg",
    "subject1": "Cơ sở dữ liệu",
    "time1": "13h30 - 15h30",
    "room1": "B201",
    "subject2": "Toán rời rạc",
    "time2": "13h30 - 17h30",
    "room2": "B201",
  }

// back + điều kiện + redirect 
// call api tkb


function App() {
  const webCamRef = useRef(null);
  const canvasRef = useRef(null);
  const inProcessRef = useRef(false);
  const modalRef = useRef(null);
  const notiRef = useRef(null);
  const dataRef = useRef(InitData); //store all data here
  const screenSize = useRef({
    width: 0,
    height: 0,
  });

  var camera = null;
  const img = new Image();
  img.src = require("./Banner.png")

  const Contents = useRef({
    dataRef,
  })

  const Actions = {
    setData: (res) => { dataRef.current = res},
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
      

      //Noti
      if (sHeight < 300 && sWidth < 255 && !inProcessRef.current){
        setTimeout(()=>{
          notiRef.current.setshowNoti(true);
        },1500);
        
      }
      
      //Process
      if (sHeight > 300 && sWidth > 225 && !inProcessRef.current) {
        inProcessRef.current = true;
        notiRef.current.setshowNoti(false);
        let file = DataURLtoFile(webCamRef.current.getScreenshot(), `${1}.jpeg`);
        console.log("file: ", file)

        //Call api for modal
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
                  dataRef.current.gmail = res["data"][0]["name"].split("-")[1];
                }
                else{
                  dataRef.current.name = "Tôi là người mới";
                  dataRef.current.MSSV ="Nhập ID"
                }
 
                dataRef.current.path = "https://api.mmlab.uit.edu.vn/face/" + res["data"][0]["path"];
              }
      
              modalRef.current.setshowModal(true);
          }) 

      }
    }
  
    //Reset
    if (results.detections.length === 0 && inProcessRef.current == true) {
      setTimeout(() => {
        inProcessRef.current = false;
        modalRef.current.setshowModal(false);
      }, 5000);
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
          <Webcam ref={webCamRef} style={{ visibility: "hidden", position: "absolute" }} />
          <canvas ref={canvasRef} style={{ position: "absolute", top : "100px", left: "0"}}></canvas>
          <Noti ref={notiRef} />
          <Modal ref={modalRef} />
        </dispatch.Provider>
      </context.Provider>

    </div>
  );
}

export default App;
