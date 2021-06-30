import React, { useState } from 'react';
import { authService, firebaseInstance } from '../../firebase';

function Auth() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState();

  // 이메일과 비빌번호 입력
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;

    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  // 계정 생성 또는 로그인
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      if (newAccount) {
        // 계정 만들기
        await authService.createUserWithEmailAndPassword(email, password);
      } else {
        // 로그인
        await authService.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  // 눌렀을 때 이메일로 계정 생성 또는 이메일 로그인으로 전환
  const onToggleAccount = () => setNewAccount((prev) => !prev);

  // 구글 로그인 및 깃허브 로그인
  const onSocialLogin = async (event) => {
    const {
      target: { name },
    } = event;

    let provider;

    if (name === 'google') {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === 'github') {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    await authService.signInWithPopup(provider);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          onChange={onChange}
          type="text"
          placeholder="이메일"
          required
          value={email || ''}
        />
        <input
          name="password"
          onChange={onChange}
          type="password"
          placeholder="비밀번호"
          required
          value={password || ''}
        />
        <input type="submit" value={newAccount ? '계정 만들기' : '로그인'} />
        {error}
      </form>
      <span onClick={onToggleAccount}>
        {newAccount ? '로그인' : '계정 만들기'}
      </span>
      <div>
        <button name="google" onClick={onSocialLogin}>
          구글 로그인
        </button>
        <button name="github" onClick={onSocialLogin}>
          깃허브 로그인
        </button>
      </div>
    </>
  );
}

export default Auth;
