import React, { useState, useEffect } from 'react';
import Quagga from 'quagga';
import { withRouter } from 'react-router';

import VideoSkeleton from './Video.skeleton';
import BarcodeInputField from '../barcodeInputField';

import './video.css';

const Video = ({ history }) => {
  const [videoInit, setVideoInit] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [barcode, setBarcode] = useState(null);

  const onProductFound = (code) => {
    if (code === 'not-found') {
      history.push(`/product/${code}?code=${barcode}`);
    } else {
      history.push(`/product/${code}`);
    }
  }

  const onInitSuccess = () => {
    Quagga.start();
    setVideoInit(true);
  }

  const onDetected = (result) => {
    Quagga.offDetected(onDetected);
    fetch(`https://world.openfoodfacts.org/api/v0/product/${result.codeResult.code}.json`)
      .then(res => res.json())
      .then(res => onInfoFetched(res));
  }

  const onInfoFetched = (res) => {
    const { status, code } = res;
    setBarcode(code);
    setAttempts(prevState => prevState + 1);

    if (status === 1) {
      onProductFound(code);
    } else {
      Quagga.onDetected(onDetected);
    }
  }

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      Quagga.init({
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: document.querySelector('#video')
        },
        numOfWorkers: 1,
        locate: true,
        decoder: {
          readers: ['ean_reader', 'ean_8_reader', 'upc_reader', 'code_128_reader']
        }
      }, (err) => {
        if (err) {
          setVideoError(true);
          return;
        }
        onInitSuccess();
      });
      Quagga.onDetected(onDetected);
      return () => Quagga.stop();
    }
    return undefined;
  }, []);

  useEffect(() => {
    if (attempts > 3) {
      onProductFound('not-found');
    }
  }, [attempts]);

  return (
    <div>
      <div className="videoTitle">
        <p>To get the nutritional value of a product scan the barcode below:</p>
      </div>
      <div className="videoContainer">
        {videoError ?
          <div className="videoUnsupported">
            <div>
              <p>Camera access is not supported on your device, or something went wrong!</p>
              <br></br>
              <p>You can enter the barcode below instead: </p>
              <BarcodeInputField />
            </div>
          </div>
          :
          <div>
            <div className="video" id="video" />
            {videoInit ? '' : <VideoSkeleton />}
          </div>
        }
      </div>
    </div>
  );
}

export default withRouter(Video);
