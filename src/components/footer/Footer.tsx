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
        <h3 className="footer__title">Our Address</h3>
        <ul className="footer__data">
          <li className="footer__information">1234 - 1234</li>
          <li className="footer__information">Seoul - 43210</li>
          <li className="footer__information">123-456-789</li>
        </ul>
      </div>
      <div className="footer__content">
        <h3 className="footer__title">Contact Us</h3>
        <ul className="footer__data">
          <li className="footer__information mb-1">+999 888 777</li>
          <div className="footer__social">
            <a href="https://www.facebook.com/" className="footer__social-link">
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com/"
              className="footer__social-link"
            >
              <BsInstagram />
            </a>
            <a href="https://twitter.com/" className="footer__social-link">
              <FaTwitter />
            </a>
          </div>
        </ul>
      </div>
      <div className="footer__content">
        <h3 className="footer__title">
          We accept all <br />
          credit cards
        </h3>
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
