import './userInfo.scss';

const UseInfo = () => {
  return (
    <div className="useInfo">
      <h1>필수적 개인정보의 수집 및 이용</h1>
      <div className="useInfo__content">
        <p>수집목적</p>
        <div className="useInfo__content__detail">
          <p>회원계정 관리</p>
          <p>제품 구매 계약의 체결 및 이행</p>
          <p>고객 상담채널을 통한 민원사항 처리</p>
        </div>
      </div>
      <div className="useInfo__content">
        <p>수집항목</p>
        <div className="useInfo__content__detail">
          <p>이메일 주소, 비밀번호, 이름</p>
        </div>
      </div>
      <div className="useInfo__content">
        <p>보유기간</p>
        <div className="useInfo__content__detail">
          <p>회원탈퇴시까지</p>
        </div>
      </div>
    </div>
  );
};

const UseInfoSelect = () => {
  return (
    <div className="useInfo">
      <h1>선택적 개인정보의 수집 및 이용</h1>
      <div className="useInfo__content">
        <p>수집목적</p>
        <div className="useInfo__content__detail">
          <p>BABAN</p>
        </div>
      </div>
      <div className="useInfo__content">
        <p>수집항목</p>
        <div className="useInfo__content__detail">
          <p>이메일 주소</p>
        </div>
      </div>
      <div className="useInfo__content">
        <p>보유기간</p>
        <div className="useInfo__content__detail">
          <p>회원탈퇴시까지</p>
        </div>
      </div>
    </div>
  );
};

export { UseInfo, UseInfoSelect };
