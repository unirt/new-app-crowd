import { useState, useEffect } from 'react';
// import { API, graphqlOperation } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import { onUpdateFacility } from '../graphql/subscriptions';
import { OnUpdateFacilitySubscription, RecordingStatus } from '../API';

type Facility = OnUpdateFacilitySubscription['onUpdateFacility'];

const client = generateClient();

const useSubscribeFacility = () => {
  const [facility, setFacility] = useState<Facility>({
    __typename: 'Facility',
    id: '',
    name: '',
    numberOfPeople: 0,
    description: '',
    recordingStatus: RecordingStatus.INACTIVE,
    createdAt: '',
    updatedAt: ''
  });
  useEffect(() => {
    // 施設情報の更新をSubscribe
    const subscription = client.graphql({
      query: onUpdateFacility
    }).subscribe({
      next: (result) => {
        setFacility(result.data.onUpdateFacility);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { facility };
};
export default useSubscribeFacility;
