import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { updateItem, removeItem } from 'redux/cartItem';
import { userUpdateItem, UserRemoveItem } from 'redux/logincartIems';
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from 'react-icons/ai';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { CartProductType } from 'pages/cartPage/CartPage'; //타입
import { RootState } from 'redux/store'; //리덕스 타입
import numberWithCommas from 'util/numberWithCommas';
import './cartCard.scss';

// 타입
interface PropsType {
  item: CartProductType;
}

const CartCard = (props: PropsType) => {
  const dispatch = useDispatch();
  const UserloginState = useSelector((state: RootState) => state.login.login);

  const [item, setItem] = useState(props.item);
  const [quantity, setQuantity] = useState(props.item.quantity);

  useEffect(() => {
    setItem(props.item);
    setQuantity(props.item.quantity);
  }, [props.item, UserloginState]);

  const updateQuantity = (opt: string) => {
    if (opt === 'plus') {
      if (UserloginState) {
        dispatch(userUpdateItem({ ...item, quantity: quantity + 1 }));
      } else {
        dispatch(updateItem({ ...item, quantity: quantity + 1 }));
      }
    }
    if (opt === 'minus') {
      if (UserloginState) {
        dispatch(
          userUpdateItem({
            ...item,
            quantity: quantity - 1 === 0 ? 1 : quantity - 1,
          }),
        );
      } else {
        dispatch(
          updateItem({
            ...item,
            quantity: quantity - 1 === 0 ? 1 : quantity - 1,
          }),
        );
      }
    }
  };

  const removeCartItem = () => {
    alert('해당 아이템을 삭제하시겠습니까?');
    if (UserloginState) {
      dispatch(UserRemoveItem(item));
    } else {
      dispatch(removeItem(item));
    }
  };

  return (
    <div className="cart-card">
      <div className="cart-card__title">{item.name}</div>
      <div className="cart-card__contents">
        <div
          className="cart-card__contents__img"
          style={{ backgroundImage: `url(${item.image})` }}
        ></div>
        <div className="cart-card__contents__infobox">
          <div className="cart-card__contents__infobox__info">
            <div>color: {item.color}</div>
            <div>
              price: {numberWithCommas(`${item.price * item.quantity}`)}
            </div>
            <div className="qunt-box">
              <div className="mb-1">Quntity</div>
              <div className="qunt-box__quan">
                <AiOutlineMinusSquare onClick={() => updateQuantity('minus')} />
                <div>{quantity}</div>
                <AiOutlinePlusSquare onClick={() => updateQuantity('plus')} />
              </div>
            </div>
          </div>
          <div className="delete">
            <RiDeleteBin6Line onClick={removeCartItem} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
