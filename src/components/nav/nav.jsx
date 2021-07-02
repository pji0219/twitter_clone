import React from 'react';
import { Link } from 'react-router-dom';

function Nav({ userObj }) {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/" exact="true">
            홈
          </Link>
        </li>
        <li>
          <Link to="/profile">{userObj.displayName}의 프로필</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
