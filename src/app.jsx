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
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    // user 로그인 상태 변화 감지
    authService.onAuthStateChanged((user) => {
      // 로그인 상태에 따른 분기 처리 (user가 있으면 로그인 상태)
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }

      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? (
        <Router isLoggedIn={isLoggedIn} userObj={userObj} />
      ) : (
        <h1>initializing...</h1>
      )}
      <Footer />
    </>
  );
}

export default App;
