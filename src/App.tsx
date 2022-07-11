import { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from './components/header/Header';
import Footer from 'components/footer/Footer';
import './App.scss';
import { RootState } from 'redux/store';
import { Home } from 'pages/Home';
import { auth } from 'firebase/firebaseInit';
import { useEffect } from 'react';
import { login } from 'redux/login';
import Loading from 'components/loading/Loading';

const Products = lazy(() => import('./pages/Products'));
const Login = lazy(() => import('./components/login/Login'));
const SignUp = lazy(() => import('./components/signUp/SignUp'));
const ProductDetail = lazy(() => import('./pages/productView/ProductDetail'));
const PostCorrect = lazy(() => import('./components/postCorrect/PostCorrect'));
const CartPage = lazy(() => import('./pages/cartPage/CartPage'));
const Review = lazy(() => import('./pages/review/Review'));
const Write = lazy(() => import('./components/write/Write'));
const Admin = lazy(() => import('./pages/admin/Admin'));

function App() {
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(login(true));
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <div className={`layout ${themeMode}`}>
        <Header />
        <Suspense fallback={<Loading />}>
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
        </Suspense>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
