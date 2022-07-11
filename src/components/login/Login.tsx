import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import firebase from 'firebase/app';
import Button from 'components/button/Button';
import { login } from 'redux/login';
import PageHeader from 'components/pageHeader/PageHeader';
import { auth, db, firebaseInstance } from 'firebase/firebaseInit';
import { userAddItem } from 'redux/logincartIems';
import googleBtn from '../../assets/images/google_sign.webp';
import './login.scss';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  const logins = () => {
    // 로그인하기
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        localStorage.setItem('userUID', JSON.stringify(auth.currentUser.uid));
        dispatch(login(true));

        db.collection('user')
          .doc(`${auth.currentUser.uid}`)
          .get()
          .then((res) => {
            res.data().cart.forEach((i: any) => {
              dispatch(userAddItem(i));
            });
          })
          .catch(() => {
            return;
          });
        alert('회원님 반갑습니다.');
        navigate('/');
      })
      .catch(() => alert('정보가 일치하지 않습니다.'));
  };

  function handleGoogleLogin() {
    const provider = new firebaseInstance.auth.GoogleAuthProvider(); // provider를 구글로 설정
    auth
      .signInWithPopup(provider) // popup을 이용한 signup
      .then((data) => {
        localStorage.setItem('userUID', JSON.stringify(data.user.uid));
        alert('Google 로그인이 되었습니다.');
        dispatch(login(true));
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <PageHeader />
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
          <Button onClick={logins} className="">
            Login
          </Button>
        </div>
        {/* 등록안내 */}
        <div className="login__info">
          <h2>등록</h2>
          <p>BABAN 회원으로 가입하시면 빠르고 편리하게 이용하실 수 있습니다.</p>
          <p>
            아직 BABAN의 회원이 아니시라면 이메일로 간편하게 가입하실 수
            있습니다.
          </p>
          <div className="login__signBtns">
            <Link to="/signup">
              <Button className="">Sign in</Button>
            </Link>
            <div onClick={handleGoogleLogin}>
              <img src={googleBtn} alt="google Sign" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
