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
        setUserObj({
          displayName:user.displayName,
          uid:user.uid,
          updateProfile: (args) => user.updateProfile(args)
        });
      } else {
        setIsLoggedIn(false);
      }

      setInit(true);
    });
  }, []);


  // 프로필 페이지에서 프로필 이름 수정 했을 때 그 것을 적용해줌
  const refreshUser = () => {
    const user = authService.currentUser;

    setUserObj({
      displayName:user.displayName,
      uid:user.uid,
      updateProfile: (args) => user.updateProfile(args)
    });
  }

  return (
    <>
      {init ? (
        <Router isLoggedIn={isLoggedIn} userObj={userObj} refreshUser={refreshUser} />
      ) : (
        <h1>initializing...</h1>
      )}
      <Footer />
    </>
  );
}

export default App;
