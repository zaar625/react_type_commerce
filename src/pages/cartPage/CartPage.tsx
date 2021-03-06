import { useCallback, useEffect, useState } from 'react';
import { db, database } from 'firebase/firebaseInit';
import { useSelector } from 'react-redux';
import CartCard from 'components/cartCard/CartCard';
import { SwiperSlide, Swiper } from 'swiper/react';
import Button from 'components/button/Button';
import PageHeader from 'components/pageHeader/PageHeader';
import { RootState } from 'redux/store';
import numberWithCommas from 'util/numberWithCommas';

import './cartPage.scss';

// 타입
export interface CartProductType {
  color: string;
  id: number;
  image: string;
  name: string;
  price: number;
  quantity: number;
}

const CartPage = () => {
  const notUserCartItems = useSelector(
    (state: RootState) => state.cartItem.items,
  );
  const UserCartItems = useSelector(
    (state: RootState) => state.userCartItem.items,
  );

  const user = useSelector((state: RootState) => state.login.login);

  const [loginUserItems, setLoginUserItems] = useState<CartProductType[]>([]); //로그인 유저 카트 아이템들
  const [notUserItems, setNoUserItems] = useState<CartProductType[]>([]); //비유저 카트 아이템
  const [totalProducts, setTotalProducts] = useState(0); //카트상품 총 개수(동일품목시 수량까지 합산)
  const [totalPrice, setTotalPrice] = useState(0); //카트상품 총 금액

  useEffect(() => {
    setNoUserItems(notUserCartItems);
    setLoginUserItems(UserCartItems);

    const el = user ? loginUserItems : notUserItems;

    setTotalProducts(
      el.reduce(
        (pre: number, curr: CartProductType) => pre + Number(curr.quantity),
        0,
      ),
    ); //총수량
    setTotalPrice(
      el.reduce(
        (pre, curr) => pre + Number(curr.quantity) * Number(curr.price),
        0,
      ),
    );
  }, [
    loginUserItems,
    notUserItems,
    notUserCartItems,
    totalProducts,
    totalPrice,
    UserCartItems,
  ]);
  console.log(loginUserItems);
  //구매하기 함수
  const purchase = () => {
    if (user && window.confirm('해당 상품을 구매하시겠습니까?')) {
      const purchaseItem = loginUserItems;
      const salesItem = { ...purchaseItem };
      console.log(purchaseItem, salesItem);
      // -------------------------firebase stock데이터 변경 로직
      purchaseItem.forEach((i) => {
        const newStock = i.quantity;
        db.collection('products')
          .where('name', '==', `${i.name}`)
          .get()
          .then((res) => {
            res.forEach((doc) => {
              const itemStock = doc.data().stock;
              const newPostKey = database.ref().child(`${doc.id}`).key; //item06

              db.collection('products')
                .doc(newPostKey)
                .update({
                  stock: itemStock - newStock,
                })
                .then(() => {
                  console.log('Document successfully updated!');
                });
            });
          });
      });

      db.collection('sales')
        .add(salesItem)
        .then(() => {
          console.log('sales 데이터에 담겼습니다.');
        });
      alert('구매가 완료되었습니다.');
    } else {
      alert('로그인을 해주세요.');
    }
  };
  return (
    <>
      <PageHeader />
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
        </div>
        <div className="cart-page__purchase">
          <div>
            <p>총 {totalProducts}개의 상품</p>
            <p>총 {numberWithCommas(`${totalPrice}`)} 원</p>
          </div>
          <Button onClick={purchase}>구매하기</Button>
        </div>
      </div>
    </>
  );
};

export default CartPage;
