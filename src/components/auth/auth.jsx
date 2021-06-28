import React, { useState } from 'react';
import { authService } from '../../firebase';

function Auth() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [newAccount, setNewAccount] = useState(true);

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        // 계정 만들기
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        // 로그인
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={onEmailChange}
          type="text"
          placeholder="이메일"
          required
          value={email}
        />
        <input
          onChange={onPasswordChange}
          type="password"
          placeholder="비밀번호"
          required
          value={password}
        />
        <input type="submit" value={newAccount ? '계정 만들기' : '로그인'} />
      </form>
      <div>
        <button>구글 로그인</button>
        <button>깃허브 로그인</button>
      </div>
    </>
  );
}

export default Auth;
