import React, { useEffect, useState } from 'react';
import { dbService } from '../../firebase';
import Tweet from '../tweet/tweet';

function Home({ userObj }) {
  const [tweet, setTweet] = useState();
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    // DB에 있는 트윗 조회
    const getTweets = async () => {
      // DB에 일어나는 작업들 실시간 감지 (데이터 CRUD) 하고 데이터 조회
      dbService.collection('tweets').onSnapshot((snapshot) => {
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
    await dbService.collection('tweets').add({
      text: tweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    //DB에 트윗 저장후 state 빈 문자열로 바꿈
    setTweet('');
  };

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
        <input type="file" accept="image/*" />
        <input type="submit" value="트윗하기" />
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
