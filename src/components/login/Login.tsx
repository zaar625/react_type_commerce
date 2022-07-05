import Button from 'components/button/Button';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import './login.scss';
import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // input.value 함수
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const login = (e: any) => {
    // 로그인하기
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        alert('회원님 반갑습니다.');
        window.location.replace('/');
      });
  };

  return (
    <div className="login container">
      <div className="login__form">
        <h2>로그인</h2>
        <form>
          <input
            type="email"
            placeholder="이메일"
            name="email"
            value={email}
            onChange={onChange}
          ></input>
          <label className="a11y-hidden ">Email</label>
        </form>
        <form>
          <input
            type="password"
            placeholder="비밀번호"
            name="password"
            value={password}
            id="password"
            onChange={onChange}
          ></input>
          <label className="a11y-hidden ">password</label>
        </form>
        <p>비밀번호를 잊으셨습니까?</p>
        <Button onClick={login} className="">
          Login
        </Button>
      </div>
      {/* 등록안내 */}
      <div className="login__info">
        <h2>등록</h2>
        <p>BABAN 회원으로 가입하시면 빠르고 편리하게 이용하실 수 있습니다.</p>
        <p>
          아직 BABAN의 회원이 아니시라면 이메일로 간편하게 가입하실 수 있습니다.
        </p>
        <Link to="/signup">
          <Button className="">Sign in</Button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
