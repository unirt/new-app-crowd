import { useState } from 'react';
import { fetchAuthSession } from 'aws-amplify/auth';

const useCurrentUser = () => {
  const [group, setGroup] = useState('');
  fetchAuthSession()
    .then(sess => {
      const groups = sess.tokens?.accessToken.payload['cognito:groups'] as string[] | undefined
      setGroup(groups !== undefined && groups.length === 1 ? groups[0] : '')
    })
    .catch(err => {
      throw new Error(err);
    });

  return { group };
};
export default useCurrentUser;
