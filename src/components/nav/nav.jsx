import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/" exact>
            홈
          </Link>
        </li>
        <li>
          <Link to="/profile">내 프로필</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
