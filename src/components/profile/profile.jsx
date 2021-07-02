import React, { useEffect, useState } from 'react';
import { authService, dbService } from '../../firebase';
import { useHistory } from 'react-router-dom';

function Profile({ userObj, refreshUser }) {
  const [newProfileName, setNewProfileName] = useState(userObj.displayName);
  const history = useHistory();

  // useEffect(() => {
  //   const getMyTweets = async () => {
  //     // 현재 로그인 된 user가 트윗한 트윗들만 필터링
  //     const tweets = await dbService
  //     .collection('tweets')
  //     .where('creatorId', '==', userObj.uid)
  //     .orderBy('createAt')
  //     .get();
  //     console.log(tweets.docs.map((doc) => doc.data()));
  //   };
  //   getMyTweets();
  // }, []);

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
    if(userObj.displayName !== newProfileName) {
      await userObj.updateProfile({
        displayName: newProfileName
      })

      // 프로필 이름 변경 적용
      refreshUser();
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="프로필 이름 입력"
          onChange={onChange}
          value={newProfileName}
        />
        <input type="submit" value="프로필 수정" />
      </form>
      <button onClick={onLogOut}>로그아웃</button>
    </>
  );
}

export default Profile;
