import { useEffect, useState, useCallback } from 'react';
import firebase from 'firebase/app';
import { db } from 'firebase/firebaseInit';
import { useSelector } from 'react-redux';
import CartCard from 'components/cartCard/CartCard';
import { SwiperSlide, Swiper } from 'swiper/react';
import Button from 'components/button/Button';

import './cartPage.scss';

const CartPage = () => {
  const notUserCartItems = useSelector((state: any) => state.cartItem.items);
  const UserCartItems = useSelector((state: any) => state.userCartItem.items);

  const user = useSelector((state: any) => state.login.login);

  const [loginUserItems, setLoginUserItems] = useState<any[]>([]); //로그인 유저 카트 아이템들
  const [notUserItems, setNoUserItems] = useState<any[]>([]); //비유저 카트 아이템
  const [totalProducts, setTotalProducts] = useState(0); //카트상품 총 개수(동일품목시 수량까지 합산)
  const [totalPrice, setTotalPrice] = useState(0); //카트상품 총 금액

  useEffect(() => {
    const el = user ? loginUserItems : notUserItems;
    setNoUserItems(notUserCartItems);
    setLoginUserItems(UserCartItems);
    setTotalProducts(
      el.reduce((pre: any, curr: any) => pre + Number(curr.quantity), 0),
    ); //총수량
    setTotalPrice(
      el.reduce(
        (pre, curr) => pre + Number(curr.quantity) * Number(curr.price),
        0,
      ),
    );

    // total();
  }, [
    loginUserItems,
    notUserItems,
    notUserCartItems,
    totalProducts,
    totalPrice,
    UserCartItems,
  ]);

  // 로그인 유저의 아이템 가져오는 함수.
  // const fetchUserItems = () => {
  //   firebase.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       db.collection('user')
  //         .doc(user.uid)
  //         .get()
  //         .then((res) => {
  //           console.log(res.data().cart);
  //           setLoginUserItems(res.data().cart);
  //         });
  //     }
  //   });
  // };

  return (
    <div className="cart-page">
      <p>장바구니에 담긴 상품은 구매가 완료될 때까지 예약되지 않습니다.</p>
      <div className="cart-page__list">
        <Swiper grabCursor={true} spaceBetween={10} slidesPerView={'auto'}>
          {user
            ? loginUserItems.map((item, index) => (
                <SwiperSlide key={index}>
                  <CartCard item={item} />
                </SwiperSlide>
              ))
            : notUserItems.map((item, index) => (
                <SwiperSlide key={index}>
                  <CartCard item={item} />
                </SwiperSlide>
              ))}
        </Swiper>
        <div>
          <p>{totalProducts}</p>
          <p>{totalPrice}</p>
          <Button>구매하기</Button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
