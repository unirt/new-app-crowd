import './App.css';

import { Amplify } from 'aws-amplify';
import { signOut } from 'aws-amplify/auth';
import amplifyconfig from './amplifyconfiguration.json';
import { WithAuthenticatorProps, withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import useCurrentUser from './hooks/CurrentUser';
import Camera from './components/camera';
import Crowd from './components/crowd';
import 'semantic-ui-css/semantic.min.css';

Amplify.configure(amplifyconfig);

async function handleSignOut() {
  try {
    await signOut({ global: true });
  } catch (error) {
    console.log('error signing out: ', error);
  }
}

function App({ user }: WithAuthenticatorProps) {
  const { group } = useCurrentUser();

  return (
    <>
      <div className='header'>
        <h2>Hello {user?.username}</h2>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
      {(() => {
        return group === 'admin' ? <Camera /> : <Crowd />;
      })()}
    </>
  );
};

export default withAuthenticator(App)
