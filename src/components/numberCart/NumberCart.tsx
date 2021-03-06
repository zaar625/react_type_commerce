import React from 'react';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import './numberCart.scss';
import { RootState } from 'redux/store';

const NumberCart = () => {
  const UserloginState = useSelector((state: RootState) => state.login.login);
  const notUserCartItems = useSelector(
    (state: RootState) => state.cartItem.items,
  ); //비로그인 유저카트 가져오기
  const UserCartItems = useSelector(
    (state: RootState) => state.userCartItem.items,
  ); //로그인된 유저 카트 가져오기

  const [cartNumState, setCartNumState] = useState<number>(0);

  useEffect(() => {
    //로그인 유저가 있다면,
    if (UserloginState) {
      setCartNumState(UserCartItems.length);
    } else {
      setCartNumState(notUserCartItems.length);
    }
  }, [cartNumState, UserCartItems, notUserCartItems, UserloginState]);
  return (
    <div className="number-cart">
      <div className="number-cart__num">{cartNumState}</div>
      <FaShoppingCart />
    </div>
  );
};

export default React.memo(NumberCart);
