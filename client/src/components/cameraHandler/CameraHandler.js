import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import dataHandler from '../dataHandler';

import BarcodeInputField from '../barcodeInputField';

import './cameraHandler.css';

const Video = lazy(() => import('../Video'));

const CameraHandler = () => {

  const [ isCameraSupported, setCameraSupported ] = useState(false);
  const [ isCameraEnabled, setCameraEnabled ] = useState(dataHandler.isCameraPermissionGranted());

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      setCameraSupported(true);
    }
  }, [])

  const onCamEnabled = () => {
    dataHandler.cameraPermissionGranted();
    setCameraEnabled(true);
  }

  return (
    <div className = "cameraContainer ">
      {isCameraSupported && isCameraEnabled ?
        <Suspense fallback={<div>Loading...</div>}>
          <Video />
        </Suspense>
      :
        ""
      }
      {isCameraSupported && !isCameraEnabled ?
        <>
          <div className="cameraMessage">To enable camera click the button below:
            <br/>
          </div>
          <button type="button" aria-label="Enable Camera" className="btn__round cameraEnable" onClick={onCamEnabled}>
            <Camera />
          </button>
        </>
        :
        ""
      }
      {!isCameraSupported ?
        <div className="cameraUnsupported">
          <div>
            <p>Camera access is not supported on your device, or something went wrong!</p>
            <br></br>
            <p>You can enter the barcode below instead: </p>
            <BarcodeInputField />
          </div>
        </div>
        :
        ""
      }
         <Button
              as={Link} to="/history"
              variant="warning"
              className="me-2 cameraButton ">
              View History
          </Button>
    </div>
  );
}

export default CameraHandler;
