import React from 'react';
import { authService } from '../../firebase';
import { useHistory } from 'react-router-dom';

function Profile() {
  const history = useHistory();
  const onLogOut = () => {
    authService.signOut();
    history.push('/');
  };

  return (
    <>
      <button onClick={onLogOut}>로그아웃</button>
    </>
  );
}

export default Profile;
