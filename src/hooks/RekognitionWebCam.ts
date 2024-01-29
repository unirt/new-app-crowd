/* eslint-disable newline-before-return */
import { useCallback, useState, RefObject } from 'react';
// import { API, graphqlOperation } from '@aws-amplify/api';
import { generateClient } from 'aws-amplify/api';
import { Predictions } from '@aws-amplify/predictions';
import Webcam from 'react-webcam';
import { updateFacility } from '../graphql/mutations';
import { UpdateFacilityInput, RecordingStatus } from '../API';

type Options = {
  webCamRef: RefObject<Webcam & HTMLVideoElement>;
  captureInterval: number;
};

const client = generateClient();

export const createJpegFile4Base64 = (base64: string, name: string): File => {
  const bin = atob(base64.replace(/^.*,/, ''));
  const buffer = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) {
    buffer[i] = bin.charCodeAt(i);
  }

  return new File([buffer.buffer], name, { type: 'image/jpeg' });
};

const useRekognitionWebCam = (props: Options) => {
  // 実装の簡易化のため、Facility IDには固定値を指定
  const targetFacilityId = '13ecaf2e-eba4-48a5-a98b-26fdbd6296ba'; // <-- ここを施設IDで置き換える
  const { webCamRef, captureInterval } = props;
  const [recordInterval, setRecordInterval] = useState<number>();
  const capture = useCallback(() => {
    if (webCamRef && webCamRef.current) {
      const imageSrc = webCamRef.current.getScreenshot();
      const file = createJpegFile4Base64(imageSrc !== null ? imageSrc : '', '');

      // Rekognitionに画像を送信
      Predictions.identify({
        labels: {
          source: {
            file
          },
          type: 'ALL'
        }
      })
        .then(result => {
          if (!result || !result.labels) return 0;
          const person = result.labels.filter(l => l.name === 'Person');
          return person[0]?.boundingBoxes?.length ?? 0;
          // return person.length > 0 ? person[0].boundingBoxes.length : 0;
        })
        .then(numberOfPeople => {
          // Rekognitionの結果を元に施設の人数データを更新
          client.graphql({
            query: updateFacility,
            variables: {
              input: {
                id: targetFacilityId,
                numberOfPeople
              } as UpdateFacilityInput
            }
          })
        })
        .catch(err => {
          throw new Error(err);
        });
    }
  }, [webCamRef]);

  const startRecord = () => {
    // カメラをACTIVEする
    client.graphql({
      query: updateFacility,
      variables: {
        input: {
          id: targetFacilityId,
          recordingStatus: RecordingStatus.ACTIVE
        } as UpdateFacilityInput
      }
    }).then(() => {
      // 1秒ごとにWebカメラで撮影 & Rekognitionへの送信を開始する
      setRecordInterval(window.setInterval(capture, captureInterval));
    });
  };

  const endRecord = () => {
    // 定期的な写真撮影を解除する
    clearInterval(recordInterval);
    // カメラをINACTIVEにする
    client.graphql({
      query: updateFacility,
      variables: {
        input: {
          id: targetFacilityId,
          recordingStatus: RecordingStatus.INACTIVE
        } as UpdateFacilityInput
      }
    });
  };

  return { startRecord, endRecord };
};
export default useRekognitionWebCam;
