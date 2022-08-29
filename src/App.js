import './App.css';
//Libaries
import * as cam from "@mediapipe/camera_utils";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import Webcam from "react-webcam";
import { Hands, HAND_CONNECTIONS } from "@mediapipe/hands";


//React 
import React from 'react';
import {useEffect,useRef,useState} from 'react'


//Components
import Modal from './components/Modal';

//Modules
import isFiveTipsUp from "./modules/CheckFingersUp";


//Utils
import DataURLtoFile from "./utils/DataURLtoFile"
import axios from 'axios';

function App() {
  const webCamRef = useRef(null);
  const canvasRef = useRef(null);
  const inProcessRef = useRef(false);
  const fiveTipsUpRef = useRef(false);
  const modalRef = useRef(null);
  const screenSize = useRef({
    width: 0,
    height: 0,
  });

  var camera = null;

  async function HandDetectionOnResults(results){
    canvasRef.current.width = screenSize.current.width;
    canvasRef.current.height = screenSize.current.height;
    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");

    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

    if (results.multiHandLandmarks) {
      for (const landmarks of results.multiHandLandmarks) {
        drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {color: "#00FF00", lineWidth: 5,});
        drawLandmarks(canvasCtx, landmarks, {color: "#FF0000", lineWidth: 2,});
      }
    }


    fiveTipsUpRef.current = isFiveTipsUp(results.multiHandLandmarks, canvasRef.current.width, canvasRef.current.height);

    if (fiveTipsUpRef.current && !inProcessRef.current)
    {
        inProcessRef.current = true; 
        let file = DataURLtoFile(canvasElement.toDataURL("image/jpeg"), `${1}.jpeg`);
        console.log(file)

        //Call api for modal

        // reset 
        modalRef.current.setshowModal(true);
        setTimeout(() => {
          inProcessRef.current = false; 
          modalRef.current.setshowModal(false);
        }, 500000);

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
    const hands = new Hands({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
      },
    });

    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.7,
    });

    hands.onResults(HandDetectionOnResults);

    if (typeof webCamRef.current !== "undefined" && webCamRef.current !== null) {
      camera = new cam.Camera(webCamRef.current.video, {
        onFrame: async () => {
          await hands.send({ image: webCamRef.current.video });
        },
        width: 640,
        height: 480,
      });
    }
 
    camera.start();
  }, []);
  
  return (
    <div className="App">
      <Webcam ref={webCamRef} style={{ visibility: "hidden", position: "absolute" }}/>
      <canvas ref={canvasRef}></canvas>

      {<Modal ref={modalRef} />}
    </div>
  );
}

export default App;
