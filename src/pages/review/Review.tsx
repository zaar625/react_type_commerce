import Button from 'components/button/Button';
import ReviewCard from 'components/reviewcard/ReviewCard';
import { db } from 'firebase/firebaseInit';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './review.scss';

const Review = () => {
  const [postItems, setPostItems] = useState([]);
  const navigate = useNavigate(); //포스트 각각의 아이템
  const user = useSelector((state: any) => state.login.login);

  const fetchPost = async () => {
    const postItem: any = [];

    await db
      .collection('post')
      .get()
      .then((res) => {
        res.forEach((doc) => {
          // doc 아이디 부여
          const postData = {
            id: doc.id,
            data: doc.data(),
          };
          postItem.push(postData);
        });
        setPostItems(postItem);
      });
  }; //포스트 데이터 받아오기

  const userCheck = () => {
    console.log(user);
    if (user) {
      navigate('/write');
    } else {
      alert('로그인을 먼저 해주세요');
      navigate('/login');
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div className="review">
      <div className="review__container">
        <Button onClick={userCheck}>Write</Button>
        <div className="review__postbox">
          {postItems.length > 0
            ? postItems.map((item, index) => (
                <div className="review-post" key={index}>
                  <ReviewCard postItems={item}></ReviewCard>
                </div>
              ))
            : ''}
        </div>
      </div>
    </div>
  );
};

export default Review;
