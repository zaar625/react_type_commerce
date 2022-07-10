import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter } from 'react-icons/fa';
import { BsInstagram } from 'react-icons/bs';

import card1 from '../../assets/images/card1.webp';
import card2 from '../../assets/images/card2.webp';
import card3 from '../../assets/images/card3.webp';
import card4 from '../../assets/images/card4.webp';

import './footer.scss';
const Footer = () => {
  return (
    <footer className="footer container">
      <div className="footer__content">
        <Link to="/">
          <h1>BABAN</h1>
        </Link>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
          recusandae facilis omnis enim sint placeat!
        </p>
      </div>
      <div className="footer__content">
        <h1 className="footer__title">Our Address</h1>
        <ul className="footer__data">
          <li className="footer__information">1234 - 1234</li>
          <li className="footer__information">Seoul - 43210</li>
          <li className="footer__information">123-456-789</li>
        </ul>
      </div>
      <div className="footer__content">
        <h1 className="footer__title">Contact Us</h1>
        <ul className="footer__data">
          <li className="footer__information mb-1">+999 888 777</li>
          <li className="footer__social">
            <a
              href="https://www.facebook.com/"
              className="footer__social-link "
            >
              <p className="a11y-hidden">facebook</p>
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com/"
              className="footer__social-link"
            >
              <p className="a11y-hidden">insta</p>
              <BsInstagram />
            </a>
            <a href="https://twitter.com/" className="footer__social-link">
              <p className="a11y-hidden">twitter</p>
              <FaTwitter />
            </a>
          </li>
        </ul>
      </div>
      <div className="footer__content">
        <h1 className="footer__title">
          We accept all <br />
          credit cards
        </h1>
        <div className="footer__cards">
          <img src={card1} alt="" className="footer__card" />
          <img src={card2} alt="" className="footer__card" />
          <img src={card3} alt="" className="footer__card" />
          <img src={card4} alt="" className="footer__card" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
