import Button from 'components/button/Button';
import { useState } from 'react';
import { auth } from 'firebase/firebaseInit';
import { db } from 'firebase/firebaseInit';
import { storage } from 'firebase/firebaseInit';
import './write.scss';

const Write = () => {
  const [image, setImage] = useState(undefined); //이미지 상태
  const date = new Date();
  const postItem = {
    user: '',
    image: '',
    title: '',
    content: '',
    date: `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`,
    time: date.getTime(),
  };

  auth.onAuthStateChanged((user) => {
    if (user) {
      postItem.user = user.uid;
      console.log(user.uid);
    }
  });

  const [writeItem, setwriteItem] = useState(postItem); //포스트 작성 내용 상태

  console.log(writeItem);

  const onChange = (e: any) => {
    const { value, name } = e.target;
    setwriteItem({
      ...writeItem,
      [name]: value,
    });
  };

  const fileOnChange = (e: any) => {
    const files = e.target.files;
    setImage(files);
  };
  //업로드 함수
  const upLoad = () => {
    // const file = image === undefined ? undefined : image[0];
    // console.log(image);

    if (writeItem.title === '' || writeItem.content === '') {
      alert('제목과 내용을 확인 해 주세요.');
    } else if (image !== undefined) {
      const storageRef = storage.ref();
      const savePath = storageRef.child('postImages/' + image[0].name); //저장경로
      const fileupLoad = savePath.put(image[0]); //파이어 베이스에 업로드하기.

      fileupLoad.on(
        'state_changed',
        // 변화시 동작하는 함수 ,firebase 문법
        null,
        //에러시 동작하는 함수
        (error) => {
          console.error('실패사유는', error);
        },
        // 성공시 동작하는 함수
        () => {
          fileupLoad.snapshot.ref.getDownloadURL().then((url) => {
            console.log('업로드된 경로는', url);
            const updateItem = {
              ...writeItem,
              image: url,
            };
            db.collection('post')
              .add(updateItem)
              .then((result) => {
                alert('성공하였습니다.');
              })
              .catch((error) => {
                alert('실패');
              });
          });
        },
      );
    } else {
      db.collection('post')
        .add(writeItem)
        .then((result) => {
          alert('성공하였습니다.');
          console.log(result); //성공하면 결과값 출력 (result)
          // window.location.href = "/index.html"
        })
        .catch((error) => {
          alert('실패');
          console.log(error);
        });
    }
  };
  return (
    <div className="write container">
      <div className="write__form">
        <h2>작성하기</h2>
        <form>
          <input
            type="txt"
            placeholder="제목"
            name="title"
            onChange={onChange}
          ></input>
          <label className="a11y-hidden ">tilte</label>
        </form>
        <form>
          <textarea
            placeholder="내용"
            name="content"
            id="password"
            onChange={onChange}
          ></textarea>
          <label className="a11y-hidden ">content</label>
        </form>
        <form>
          <input
            name="image"
            type="file"
            placeholder="이미지 파일"
            onChange={fileOnChange}
          ></input>
          <label className="a11y-hidden ">image</label>
        </form>
        <Button className="" onClick={upLoad}>
          Up Load
        </Button>
      </div>
    </div>
  );
};

export default Write;
