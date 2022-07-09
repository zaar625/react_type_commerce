import HeroSlide from 'components/hero-slide/HeroSlide';
import NewArrival from 'components/product-list/NewArrival';
import { Link } from 'react-router-dom';
import Button from 'components/button/Button';
import BestItem from 'components/product-list/BestItem';
import Season from 'components/season/Season';
import TrendItem from 'components/product-list/TrendItem';

export const Home = () => {
  return (
    <>
      <HeroSlide />
      <div className="container">
        {/* NEW */}
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>New Arrival</h2>
            <Link to="/products">
              <Button className="small">View more</Button>
            </Link>
          </div>
          <NewArrival />
        </div>
        {/* BEST */}
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Best Items</h2>
            <Link to="/products">
              <Button className="small">View more</Button>
            </Link>
          </div>
          <BestItem />
        </div>
        {/* SEASON */}
        <div className="section mb-4">
          <Season />
        </div>
        {/* TREND */}
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Trend Items</h2>
            <Link to="/products">
              <Button className="small">View more</Button>
            </Link>
          </div>
          <TrendItem />
        </div>
      </div>
    </>
  );
};
