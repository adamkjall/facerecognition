import React from 'react';
import Logo from '../Logo/Logo';

const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Logo />
        <nav>
          <p
            onClick={() => onRouteChange('signOut')}
            className='f3 b mr3 link dim pa3 pointer'>Sign out</p>
        </nav>
      </div>
    );
  } else {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Logo />
        <nav style={{display: 'flex', flexDirection: 'row'}}>
          <p
            onClick={() => onRouteChange('signIn')}
            className='f3 b link dim white pa3 pointer'>Sign in</p>
          <p
            onClick={() => onRouteChange('register')}
            className='f3 b mr3 link dim white pa3 pointer'>Register</p>
        </nav>
      </div>
    );
  }
}

export default Navigation;