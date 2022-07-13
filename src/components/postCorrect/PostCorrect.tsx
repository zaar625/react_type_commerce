import { db } from 'firebase/firebaseInit';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { storage } from 'firebase/firebaseInit';
import Button from 'components/button/Button';
import '../write/write.scss';
import PageHeader from 'components/pageHeader/PageHeader';

const PostCorrect = () => {
  const params = useParams();

  const [reWrite, setRewrite] = useState<any>({});
  const [image, setImage] = useState(undefined); //이미지 상태
  //파이어베이스 해당 포스트내용 가져오기.
  useEffect(() => {
    db.collection('post')
      .doc(params.id)
      .get()
      .then((res) => {
        setRewrite(res.data());
      });
  }, []);

  const onChange = (e: any) => {
    const { value, name } = e.target;
    const date = new Date();
    setRewrite({
      ...reWrite,
      date: `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`,
      [name]: value,
    });
  };

  const fileOnChange = (e: any) => {
    const files = e.target.files;
    setImage(files);
  };

  const upLoad = () => {
    if (reWrite.title === '' || reWrite.content === '') {
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
            const editItem = {
              ...reWrite,
              image: url,
            };

            db.collection('post')
              .doc(params.id)
              .update(editItem)
              .then(() => {
                alert('수정되었습니다.');
                window.location.replace('/review');
              })
              .catch((error) => {
                console.error('실패사유는', error);
              });
          });
        },
      );
    } else {
      db.collection('post')
        .doc(reWrite.id)
        .update(reWrite)
        .then(() => {
          alert('수정되었습니다.');
          window.location.replace('/review');
        })
        .catch((error) => {
          alert('실패');
          console.log(error);
        });
    }
  };

  return (
    <>
      <PageHeader />
      <div className="write container">
        <div className="write__form">
          <h2>수정하기</h2>
          <form>
            <input
              type="txt"
              placeholder="제목"
              name="title"
              onChange={onChange}
              value={reWrite.title}
            ></input>
            <label className="a11y-hidden ">tilte</label>
          </form>
          <form>
            <textarea
              placeholder="내용"
              name="content"
              id="password"
              onChange={onChange}
              value={reWrite.content}
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
    </>
  );
};

export default PostCorrect;
