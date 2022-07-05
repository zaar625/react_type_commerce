import { db } from 'firebase/firebaseInit';
import { auth } from 'firebase/firebaseInit';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import './numberCart.scss';
const NumberCart = () => {
  const notUserCartItems = useSelector((state: any) => state.cartItem.items); //비로그인 유저카트 가져오기
  const UserCartItems = useSelector((state: any) => state.userCartItem.items); //로그인된 유저 카트 가져오기

  const [cartNumState, setCartNumState] = useState<number>(0);
  const UserloginState = useSelector((state: any) => state.login.login);

  useEffect(() => {
    //로그인 유저가 있다면,
    if (UserloginState) {
      setCartNumState(UserCartItems.length);
    } else {
      setCartNumState(notUserCartItems.length);
    }
  }, [cartNumState, UserCartItems, notUserCartItems]);
  return (
    <div className="number-cart">
      <div className="number-cart__num">{cartNumState}</div>
      <FaShoppingCart />
    </div>
  );
};

export default NumberCart;
