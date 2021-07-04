import React, { useState } from 'react';
import { dbService, storageService } from '../../firebase';
import { v4 as uuidv4 } from 'uuid';
import styles from './tweet-maker.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

function TweetMaker({ userObj }) {
  const [tweet, setTweet] = useState();
  const [imgFile, setImgFile] = useState('');

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

    // 이미지가 올려져 있으면 파일명 화면에 표시
    if (Boolean(theFile)) {
      reader.readAsDataURL(theFile);
    }

    // 이미지 로딩 이벤트 끝나고 문자열로 브라우저상에 저장된 이미지 파일 state에 넣음
    reader.onloadend = (finishedEvent) => {
      setImgFile(finishedEvent.currentTarget.result);
    };
  };

  // 이미지 지우기
  const onClearImage = () => setImgFile('');

  return (
    <>
      <form onSubmit={onSubmit} className={styles.maker_form}>
        <div className={styles.maker_input_container}>
          <input
            type="text"
            placeholder="생각을 트윗해 보세요."
            maxLength={120}
            value={tweet || ''}
            onChange={onChange}
            className={styles.maker_input_tweet}
          />
          <input
            type="submit"
            value="트윗"
            className={styles.maker_input_submit}
          />
        </div>
        <label for="img-file" className={styles.maker_input_label}>
          <span>이미지 추가</span>
          <FontAwesomeIcon icon={faPlus} />
        </label>
        <input
          id="img-file"
          type="file"
          accept="image/*"
          onChange={onFileChange}
          className={styles.maker_input_img}
        />
        {imgFile && (
          <div className={styles.maker_form_img}>
            <img src={imgFile} alt="이미지" />
            <div
              className={styles.maker_form_img_remove}
              onClick={onClearImage}
            >
              <span>이미지 삭제</span>
              <FontAwesomeIcon icon={faTimes} />
            </div>
          </div>
        )}
      </form>
    </>
  );
}

export default TweetMaker;
