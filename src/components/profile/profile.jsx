import React, { useState } from 'react';
import { authService } from '../../firebase';
import { useHistory } from 'react-router-dom';
import styles from './profile.module.css';

function Profile({ userObj, refreshUser }) {
  const [newProfileName, setNewProfileName] = useState(userObj.displayName);
  const history = useHistory();

  // 로그아웃
  const onLogOut = () => {
    authService.signOut();
    history.push('/');
  };

  // 프로필 이름 수정
  const onChange = (event) => {
    setNewProfileName(event.target.value);
  };

  // 프로필 이름 수정 사항 적용
  const onSubmit = async (event) => {
    event.preventDefault();

    // 현재 프로필 이름과 수정 입력창에 입력한 프로필 이름이 다르면 업데이트 시킴
    if (userObj.displayName !== newProfileName) {
      await userObj.updateProfile({
        displayName: newProfileName,
      });

      // 프로필 이름 변경 nav에도 적용
      refreshUser();
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit} className={styles.Profile_form}>
        <input
          type="text"
          placeholder="프로필 이름 입력"
          onChange={onChange}
          value={newProfileName}
          className={styles.form_input}
        />
        <input type="submit" value="프로필 수정" className={styles.form_btn} />
      </form>
      <button onClick={onLogOut} className={styles.log_out}>
        로그아웃
      </button>
    </div>
  );
}

export default Profile;
