import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/home/home';
import Auth from './components/auth/auth';
import Footer from './components/footer/footer';
import { authService } from './firebase';

function App() {
  // firebase 초기화 상태
  const [init, setInit] = useState(false);
  // user 로그인 상태
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // user 로그인 상태 변화 감지
    authService.onAuthStateChanged((user) => {
      // 로그인 상태에 따른 분기 처리
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }

      setInit(true);
    });
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        {isLoggedIn ? (
          <Route path="/" exact component={Home} />
        ) : (
          <Route path="/" exact component={Auth} />
        )}
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
