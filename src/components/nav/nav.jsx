import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import styles from './nav.module.css';

function Nav({ userObj }) {
  return (
    <nav>
      <ul className={styles.nav_container}>
        <li>
          <Link to="/" exact="true" className={styles.home_link}>
            <FontAwesomeIcon icon={faTwitter} color={'#04AAFF'} size="2x" />
            <span>홈</span>
          </Link>
        </li>
        <li>
          <Link to="/profile" className={styles.profile_link}>
            <FontAwesomeIcon icon={faUser} color={'#04AAFF'} size="2x" />
            <span className={styles.profile_name}>
              {userObj.displayName
                ? `${userObj.displayName}의 프로필`
                : '프로필'}
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
