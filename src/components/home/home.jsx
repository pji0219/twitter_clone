import React, { useEffect, useState } from 'react';
import { dbService } from '../../firebase';
import Tweet from '../tweet/tweet';
import TweetMaker from '../tweet-maker/tweet-maker';
import styles from './home.module.css';

function Home({ userObj }) {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    // DB에 있는 트윗 조회
    const getTweets = () => {
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

  return (
    <div className={styles.container}>
      <TweetMaker userObj={userObj} />
      <div className={styles.tweet_container}>
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            tweetObj={tweet}
            isOwner={tweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
