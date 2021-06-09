import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/home/home';
import Auth from './components/auth/auth';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Switch>
        {isLoggedIn ? (
          <>
            <Route path="/" exact component={Home} />
          </>
        ) : (
          <Route path="/auth" component={Auth} />
        )}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
