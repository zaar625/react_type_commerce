import React from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import './modal.scss';

interface Props {
  pop: React.RefObject<HTMLDivElement>;
}

const Modal = () => {
  const pop = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!document.cookie.includes('pop=ondDay')) {
      pop.current?.classList.add('on');
    }
  }, []);

  return (
    <div ref={pop} className="modal">
      <ModalContent pop={pop} />
    </div>
  );
};
export const ModalContent = (props: Props) => {
  const popupCheck = useRef<HTMLInputElement>(null);

  function closePop() {
    if (popupCheck.current?.checked) {
      document.cookie = 'pop=ondDay; path=/; max-age=86400';
    } else {
      document.cookie = 'pop=ondDay; path=/; max-age=-1';
    }
    props.pop.current?.classList.remove('on');
    props.pop.current?.classList.add('off');
  }

  return (
    <div className="modal__container">
      <div className="modal__container__contents">
        {props.pop ? (
          <div className="modal__container__contents__title">
            <h1>상품 재입고 및 배송 지연 안내</h1>
          </div>
        ) : (
          ''
        )}
        <p className="modal__container__contents__list">
          BABAN을 이용해 주셔서 감사합니다.
          <br />
          현재 일부 상품이 주문량 증가로 인해 배송이 지연되고 있습니다. <br />
          MARCE 상품은 8월 10일 재입고 예정이며 <br />
          우선 주문건부터 순차적으로 발송될 예정입니다.
          <br />
          감사합니다.
        </p>
      </div>
      {props.pop ? (
        <div className="modal__container__check">
          <label htmlFor="popupCheck">
            하루 동안 안 보기
            <input
              ref={popupCheck}
              type="checkbox"
              id="popupCheck"
              tabIndex={0}
              // onKeyDown={(e) => {
              //   if (e.key === 'Enter') e.target.click();
              // }}
            />
          </label>
          <button onClick={closePop} className="close">
            닫기
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Modal;
