import { HeroSlideItems } from 'assets/heroslideData';
import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay } from 'swiper';
import 'swiper/css';
import './hero-slide.scss';
import Button from 'components/button/Button';
import { Link } from 'react-router-dom';

const HeroSlide = () => {
  return (
    <div className="hero-slide">
      <Swiper
        // modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
      >
        {HeroSlideItems.map((item, index) => (
          <SwiperSlide key={index}>
            {({ isActive }) => (
              <div
                className={`hero-slide__item ${isActive ? 'active' : ''}`}
                style={{ backgroundImage: `url(${item.originalimage})` }}
              >
                <div className="hero-slide__item__content container">
                  <div className="hero-slide__item__content__info">
                    <h2 className="title">{item.title}</h2>
                    <div className="des">{item.des}</div>
                    <div className="btns">
                      <Link to="/products">
                        <Button className="null">View more</Button>
                      </Link>
                    </div>
                  </div>
                  <div className="hero-slide__item__content__poster">
                    <img src={item.w500} alt="poster"></img>
                  </div>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlide;
