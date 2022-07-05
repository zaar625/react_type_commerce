import NumberCart from 'components/numberCart/NumberCart';
import Theme from 'components/theme/Theme';
import firebase from 'firebase/app';
import { useEffect } from 'react';
import { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import './header.scss';

const headerNav = [
  {
    display: 'Home',
    path: '/',
  },
  {
    display: 'Products',
    path: '/products',
  },
  {
    display: 'Admin',
    path: '/admin',
  },
];

const Header = () => {
  const user = useSelector((state: RootState) => state.login.login);
  const { pathname } = useLocation();
  const headerRef = useRef<HTMLDivElement>(null);
  const active = headerNav.findIndex((e) => e.path === pathname);

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('로그아웃되었습니다.');
      })
      .catch((error) => {
        console.log('로그아웃 실패');
      });
  };

  useEffect(() => {
    const shrinkHeader = () => {
      if (headerRef !== null) {
        if (
          document.body.scrollTop > 100 ||
          document.documentElement.scrollTop > 100
        ) {
          headerRef.current?.classList.add('shrink');
        } else {
          headerRef.current?.classList.remove('shrink');
        }
      }
    };
    window.addEventListener('scroll', shrinkHeader);
    return () => {
      window.removeEventListener('scroll', shrinkHeader);
    };
  }, []);

  return (
    <div ref={headerRef} className="header">
      <div className="header__wrap container">
        <ul className="header__nav-left">
          {headerNav.map((e, i) => (
            <li key={i} className={`${i === active ? 'active' : ''}`}>
              <Link to={e.path}>{e.display}</Link>
            </li>
          ))}
        </ul>
        <div className="logo">BABAN</div>
        <div className="header__nav-right">
          {user ? (
            <div onClick={logout}>Logout</div>
          ) : (
            <Link to="/login">Login</Link>
          )}
          <Link to="/review">Review</Link>
          <Theme />
          <Link to="/cart">
            <NumberCart />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
