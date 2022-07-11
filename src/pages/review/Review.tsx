/* eslint-disable prefer-const */
import Button from 'components/button/Button';
import PageHeader from 'components/pageHeader/PageHeader';
import ReviewCard from 'components/reviewcard/ReviewCard';
import { db } from 'firebase/firebaseInit';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from 'redux/store';
import './review.scss';

export interface PostItemsType {
  data: {
    content: string;
    date: string;
    image: string;
    time: number;
    title: string;
    user: string;
  };
  id: string;
}

const Review = () => {
  console.log('review lendering');
  const [postItems, setPostItems] = useState<PostItemsType[]>([]); //포스트 각각의 아이템 집합
  const [postShow, setPostShow] = useState<PostItemsType[]>([]); //페이지당 보여질 데이터
  const [currPage, setCurrPage] = useState(0); //현재페이지일경우 css 변화
  let pages = 1; //총 페이지 let변수
  let range: number[] = []; //페이지 숫자 map사용하기 위한 배열
  const limit = 4; //페이지당 게시글 수 초기 값
  const user = useSelector((state: RootState) => state.login.login);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPost();
  }, []);

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
        postItem.sort((a: PostItemsType, b: PostItemsType) =>
          a.data.time < b.data.time ? 1 : a.data.time > b.data.time ? -1 : 0,
        ); //올린 시간순으로 정렬
        setPostItems(postItem);
        setPostShow(postItem.slice(0, Number(limit)));
      });
  }; //포스트 데이터 받아오기

  const userCheck = () => {
    if (user) {
      navigate('/write');
    } else {
      alert('로그인을 먼저 해주세요');
      navigate('/login');
    }
  };

  //페이지 클릭시 보여질 아이템함수
  const selectPage = (page: number) => {
    const start = Number(limit) * page;
    const end = start + Number(limit);

    setPostShow(postItems.slice(start, end));

    setCurrPage(page);
  };

  if (limit !== undefined) {
    const page = Math.floor(postItems.length / Number(limit)); //0
    pages = postItems.length % Number(limit) === 0 ? page : page + 1; //3/5=1
    range = [...Array(pages).keys()]; //[0,1]
  }
  return (
    <>
      <PageHeader />
      <div className="review container section">
        <div className="review__container">
          <Button onClick={userCheck}>Write</Button>
          <div className="review__postbox">
            {postShow.length > 0
              ? postShow.map((item, index) => (
                  <div className="review-post" key={index}>
                    <ReviewCard postItems={item}></ReviewCard>
                  </div>
                ))
              : ''}
          </div>
        </div>
        <div className="review__pagination">
          {pages >= 1
            ? range.map((item, index) => (
                <div
                  key={index}
                  className={`review__pagination__num ${
                    currPage === index ? 'active' : ''
                  }`}
                  onClick={() => selectPage(index)}
                >
                  {item + 1}
                </div>
              ))
            : null}
        </div>
      </div>
    </>
  );
};

export default Review;
