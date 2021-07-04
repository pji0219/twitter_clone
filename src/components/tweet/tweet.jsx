import React, { useState } from 'react';
import { dbService, storageService } from '../../firebase';
import styles from './tweet.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

function Tweet({ tweetObj, isOwner }) {
  const [update, setUpdate] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);

  // 트윗 삭제
  const onDelete = async () => {
    const delteConfirm = window.confirm('트윗을 삭제 하시겠습니까?');

    // 확인창의 확인 버튼 누르면 삭제 (true 반영)
    if (delteConfirm) {
      // 트윗 삭제
      await dbService.doc(`tweets/${tweetObj.id}`).delete();
      // 트윗의 사진 삭제
      await storageService.refFromURL(tweetObj.imgFileUrl).delete();
    }
  };

  // 수정 버튼 누를시 수정 내용 입력하는 창 나옴
  const toggleUpdate = () => setUpdate((prev) => !prev);

  // 트윗 수정
  const onChange = (event) => {
    setNewTweet(event.target.value);
  };

  // 수정된 내용 DB에 반영
  const onSubmit = async (event) => {
    event.preventDefault();

    // DB 수정
    await dbService.doc(`tweets/${tweetObj.id}`).update({
      text: newTweet,
    });

    // 수정하는 입력 창 없앰
    setUpdate(false);
  };

  return (
    <div className={styles.tweet}>
      {update ? (
        <form onSubmit={onSubmit} className={styles.tweet_update}>
          <input
            onChange={onChange}
            type="text"
            placeholder="트윗 내용을 수정하세요."
            value={newTweet}
            required
            className={styles.form_input}
          />
          <button type="submit" className={styles.form_btn}>
            수정
          </button>
          <button onClick={toggleUpdate} className={styles.cancel_btn}>
            취소
          </button>
        </form>
      ) : (
        <>
          <h4>{tweetObj.text}</h4>
          {tweetObj.imgFileUrl && (
            <img src={tweetObj.imgFileUrl} alt="이미지" />
          )}
          {isOwner && (
            <div className={styles.tweet_actions}>
              <span onClick={onDelete}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleUpdate}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Tweet;
