import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Home } from 'pages/Home';
import Header from './components/header/Header';
import Footer from 'components/footer/Footer';
import './App.scss';
import { RootState } from 'redux/store';
import Products from 'pages/Products';
import Login from 'components/login/Login';
import SignUp from 'components/signUp/SignUp';
import ProductDetail from 'pages/productView/ProductDetail';
import { auth } from 'firebase/firebaseInit';
import { useEffect } from 'react';
import { login } from 'redux/login';
import Write from 'components/write/Write';
import Review from 'pages/review/Review';
import CartPage from 'pages/cartPage/CartPage';
import Admin from 'pages/admin/Admin';
import PostCorrect from 'components/postCorrect/PostCorrect';

function App() {
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(login(true));
      } else {
        console.log('No user');
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <div className={`layout ${themeMode}`}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/products/" element={<Products />}></Route>
          <Route path="/products/:name" element={<ProductDetail />}></Route>
          <Route path="/login/" element={<Login />}></Route>
          <Route path="/signup/" element={<SignUp />}></Route>
          <Route path="/write/" element={<Write />}></Route>
          <Route path="/review/:id" element={<PostCorrect />}></Route>
          <Route path="/review/" element={<Review />}></Route>
          <Route path="/cart/" element={<CartPage />}></Route>
          <Route path="/admin/" element={<Admin />}></Route>
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
