/* eslint-disable no-useless-escape */
import { useState } from 'react';
import { auth } from 'firebase/firebaseInit';
import Button from 'components/button/Button';
import { BiErrorCircle } from 'react-icons/bi';
import { UseInfo, UseInfoSelect } from 'components/personalInfo/UseInfo';
import CheckBox from 'components/checkbox/CheckBox';
import PageHeader from 'components/pageHeader/PageHeader';

import './signup.scss';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordDBCheck, setPasswordDBCheck] = useState('');
  const [agreeCheckBox, setAgreeCheckBox] = useState(false);

  // email
  const emailvalue = (e: any) => {
    setEmail(e.target.value);
  };
  // email 유효성 검사
  const emailCheck = () => {
    const regex =
      /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const email_error = document.querySelector(
      '.email.error',
    ) as HTMLDivElement;

    if (!email) {
      email_error.style.opacity = '0';
    } else if (regex.test(email)) {
      email_error.style.opacity = '0';
      return true;
    } else {
      email_error.style.opacity = '1';
      return false;
    }
  };

  //password
  const pwvalue = (e: any) => {
    setPassword(e.target.value);
  };
  //password 더블 체크
  const DBpwvalue = (e: any) => {
    setPasswordDBCheck(e.target.value);
  };

  // password 체크함수
  const passwordCheck = () => {
    const pw_error = document.querySelector('.pw.error') as HTMLDivElement;

    if (!passwordDBCheck || password === passwordDBCheck) {
      pw_error.style.opacity = '0';
    } else {
      pw_error.style.opacity = '1';
    }
  };
  //동의 함수
  const agreeCheck = (e: HTMLInputElement) => {
    if (e.checked) {
      setAgreeCheckBox(true);
    } else {
      setAgreeCheckBox(false);
    }
  };
  // 회원가입 함수
  const signUp = (e: any) => {
    e.preventDefault();

    if (agreeCheckBox) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          alert(`님 회원가입이 되었습니다. 로그인해주세요`);
        })
        .catch(() => alert('빈 항목이 있습니다. 확인해주세요.'));
    } else {
      alert('오류');
    }
  };
  return (
    <>
      <PageHeader />
      <div className="signup container">
        <div className="signup__form">
          <h2>개인정보</h2>
          <form>
            <input
              type="email"
              placeholder="이메일"
              onChange={emailvalue}
              onKeyUp={emailCheck}
            ></input>
            <label className="a11y-hidden ">이메일</label>
            <div className="email error">
              <BiErrorCircle />
              <p>이메일 형식이 아닙니다. 확인해주세요.</p>
            </div>
          </form>
          <form>
            <input
              type="password"
              placeholder="비밀번호"
              id="pw"
              onChange={pwvalue}
            ></input>
            <label className="a11y-hidden ">password</label>
          </form>
          <form>
            <input
              type="password"
              placeholder="비밀번호를 다시 한번 입력해주세요"
              id="pw"
              onChange={DBpwvalue}
              onKeyUp={passwordCheck}
            ></input>
            <label className="a11y-hidden ">password</label>
            <div className="pw error">
              <BiErrorCircle />
              <p>비밀번호가 다릅니다. 다시 입력해주세요.</p>
            </div>
          </form>
          <form>
            <input type="text" placeholder="이름"></input>
            <label className="a11y-hidden ">dlfma</label>
          </form>
          <CheckBox onChange={agreeCheck}>
            필수적 개인정보의 수집 및 이용에 대한 동의
          </CheckBox>
          <CheckBox>선택적 개인정보의 수집 및 이용에 대한 동의</CheckBox>
          <Button className="" onClick={signUp}>
            Sign in
          </Button>
        </div>
        <UseInfo />
        <UseInfoSelect />
      </div>
    </>
  );
};

export default SignUp;
