import React, { useState, useEffect } from 'react';
import { authService } from './firebase';
import Footer from './components/footer/footer';
import Router from './components/router';

function App() {
  // firebase 초기화 state
  const [init, setInit] = useState(false);
  // user 로그인 state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // user를 기억하기 위한 state
  const [userObj, setUserObj] = useState('');

  useEffect(() => {
    // user 로그인 상태 변화 감지
    authService.onAuthStateChanged((user) => {
      // 로그인 상태에 따른 분기 처리 (user가 있으면 로그인 상태)
      if (user) {
        setIsLoggedIn(true);

        /* nav의 프로필 명을 변경할 때 유저 객체가 너무 커서 state 변화가 감지가 안되는 
          문제가 발생 하여 많은 유저 정보들 중 필요한 것만 골라서 state에 넣었음
        */
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setIsLoggedIn(false);
        setUserObj('');
      }

      setInit(true);
    });
  }, []);

  // 프로필 페이지에서 프로필 이름 수정 했을 때 그 것을 적용해줌
  const refreshUser = () => {
    const user = authService.currentUser;

    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };

  return (
    <>
      {init ? (
        <Router
          isLoggedIn={isLoggedIn}
          userObj={userObj}
          refreshUser={refreshUser}
        />
      ) : (
        <h1>initializing...</h1>
      )}
      <Footer />
    </>
  );
}

export default App;
