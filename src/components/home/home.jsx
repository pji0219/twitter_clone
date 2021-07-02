import React, { useEffect, useState } from 'react';
import { dbService, storageService } from '../../firebase';
import Tweet from '../tweet/tweet';
import { v4 as uuidv4 } from 'uuid';

function Home({ userObj }) {
  const [tweet, setTweet] = useState();
  const [tweets, setTweets] = useState([]);
  const [imgFile, setImgFile] = useState('');

  useEffect(() => {
    // DB에 있는 트윗 조회
    const getTweets = async () => {
      // DB에 일어나는 작업들 실시간 감지 (데이터 CRUD) 하고 데이터 조회
      dbService
        .collection('tweets')
        .orderBy('createdAt', 'desc')
        .onSnapshot((snapshot) => {
          const tweetArray = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setTweets(tweetArray);
        });
    };
    getTweets();
  }, []);

  // 트윗 내용 입력
  const onChange = (event) => {
    setTweet(event.target.value);
  };

  // 트윗 DB에 저장
  const onSubmit = async (event) => {
    event.preventDefault();

    let imgFileUrl = '';

    if (imgFile !== '') {
      /* 파일에 대한 레퍼런스를 만듦 
      (user id와 uuid로 준 랜덤 값과 함께 
      ( user id는 스토리지에 id별로 폴더를 만들게 되서 user별로 구분이 되게 하고 
      uuid로 사진 이름을 랜덤한 값으로 되게 함))
      */
      const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);

      // 그 후 이미지 파일을 data url형식 (문자열)으로 레퍼런스에 업데이트 (스토리지에 저장됨)
      const response = await fileRef.putString(imgFile, 'data_url');

      /* 그 다음 스토리지에 저장된 이미지를 url형식으로 가져옴 (트윗에 넣기 위해서)
        그것을 변수에 재할당
      */
      imgFileUrl = await response.ref.getDownloadURL();
    }

    // DB에 트윗 내용과 이미지 저장
    await dbService.collection('tweets').add({
      text: tweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      imgFileUrl,
    });

    // DB에 트윗 저장후 state 빈 문자열로 바꿈
    setTweet('');

    // DB에 저장 후 이미지 state를 빈 문자열로 바꿈
    setImgFile('');
  };

  // 이미지 올린 것을 화면에 보여줌 (미리보기)
  const onFileChange = (event) => {
    const theFile = event.target.files[0];

    // 파일 읽는 웹 API
    const reader = new FileReader();

    // 이미지 파일명 화면에 표시
    reader.readAsDataURL(theFile);

    // 이미지 로딩 이벤트 끝나고 문자열로 브라우저상에 저장된 이미지 파일 state에 넣음
    reader.onloadend = (finishedEvent) => {
      setImgFile(finishedEvent.currentTarget.result);
    };
  };

  // 이미지 지우기
  const onClearImage = () => setImgFile('');

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="생각을 트윗해 보세요."
          maxLength={120}
          value={tweet || ''}
          onChange={onChange}
        />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="트윗하기" />
        {imgFile && (
          <div>
            <img src={imgFile} width="100px" height="100px" alt="이미지" />
            <button onClick={onClearImage}>이미지 지우기</button>
          </div>
        )}
      </form>
      <div>
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            tweetObj={tweet}
            isOwner={tweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </>
  );
}

export default Home;
