import NumberCart from 'components/numberCart/NumberCart';
import Theme from 'components/theme/Theme';
import firebase from 'firebase/app';
import { useEffect } from 'react';
import { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
];

const Header = () => {
  const userUid = JSON.parse(localStorage.getItem('userUID'));
  const { pathname } = useLocation();
  const headerRef = useRef<HTMLDivElement>(null);
  const active = headerNav.findIndex((e) => e.path === pathname);

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        if (window.confirm('로그아웃하시겠습니까?')) {
          alert('로그아웃되었습니다.');
          window.localStorage.removeItem('userUID');
          window.localStorage.removeItem('loginCartItems');
          window.location.replace('/');
        }
      })
      .catch(() => {
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
          {userUid === 'n0RpbOhJffgXkmQC3342eqMS4Pv1' ? (
            <li className={`${pathname === '/admin' ? 'active' : ''}`}>
              <Link to="/admin">Admin</Link>
            </li>
          ) : (
            ''
          )}
        </ul>
        <div className="logo">BABAN</div>
        <div className="header__nav-right">
          {userUid !== null ? (
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
