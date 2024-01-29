/* eslint-disable newline-before-return */
import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import { Button, Icon } from 'semantic-ui-react';
import useRekognitionWebCam from '../../hooks/RekognitionWebCam';

const Component: React.FC = () => {
  const webCamRef = useRef<Webcam & HTMLVideoElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const { startRecord, endRecord } = useRekognitionWebCam({
    webCamRef,
    captureInterval: 1000
  });

  return (
    <>
      <Webcam
        audio={false}
        width="50%"
        screenshotFormat="image/png"
        ref={webCamRef}
        screenshotQuality={1}
        videoConstraints={{
          facingMode: 'environment'
        }}
      />
      <br />
      <Button
        color="green"
        disabled={isRecording}
        onClick={() => {
          setIsRecording(true);
          startRecord();
        }}
      >
        Start
      </Button>
      <Button
        color="purple"
        disabled={!isRecording}
        onClick={() => {
          setIsRecording(false);
          endRecord();
        }}
      >
        Stop
      </Button>
      {isRecording ? <Icon name="record" size="large" color="green" /> : ''}
    </>
  );
};

export default Component;
