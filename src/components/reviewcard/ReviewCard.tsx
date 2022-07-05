import Button from 'components/button/Button';
import { auth } from 'firebase/firebaseInit';
import { Link } from 'react-router-dom';
import { db } from 'firebase/firebaseInit';
import './reviewCard.scss';

const ReviewCard = ({ postItems }: any) => {
  // 포스트 삭제하기
  const deletePost = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        if (user.uid === postItems.data.user) {
          if (window.confirm('해당 게시물을 삭제하시겠습니까?')) {
            db.collection('post')
              .doc(`${postItems.id}`)
              .delete()
              .then(() => {
                alert('삭제되었습니다');
              });
          }
        } else {
          alert('삭제권한이 없습니다.');
        }
      } else alert('게시물은 작성자만 삭제할 수 있습니다.');
    });
  };

  // 포스트 수정하기
  const correctPost = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        if (user.uid === postItems.data.user) {
          if (window.confirm('해당 게시물을 수정하시겠습니까?')) {
            console.log('yes');
          }
        }
      }
    });
  };
  return (
    <div className="review-card">
      <div className="review-card__container">
        <div className="review-card__container__header">
          <div className="revier-card__container__header__titleBox">
            <div>{postItems.data.title}</div>
            <div>{postItems.data.title}</div>
          </div>
          <div>{postItems.data.date}</div>
        </div>
        <div className="review-card__container__content">
          <div
            className="postImage"
            style={{ backgroundImage: `url(${postItems.data.image})` }}
          ></div>
          <p>{postItems.data.content}</p>
        </div>
        <div className="review-card__container__btns">
          <Link onClick={correctPost} to="/write">
            <Button className="small">Correct</Button>
          </Link>
          <Button onClick={deletePost} className="small">
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
