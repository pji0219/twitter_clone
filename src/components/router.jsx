import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './home/home';
import Auth from './auth/auth';
import Profile from './profile/profile';
import Nav from './nav/nav';

function Router({ isLoggedIn, userObj }) {
  return (
    <BrowserRouter>
      {isLoggedIn && <Nav />}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route path="/" exact>
              <Home userObj={userObj} />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
          </>
        ) : (
          <Route path="/">
            <Auth />
          </Route>
        )}
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
