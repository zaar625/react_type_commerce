import Button from 'components/button/Button';
import seasonImg from '../../assets/images/SeasonImage02.webp';

import './season.scss';

const Season = () => {
  return (
    <div className="season">
      <div className="season__left"></div>
      <div className="season__right">
        <h1>changing the ideal of beauty</h1>
        <p>
          Lorem Ipsum is not simply random text. It has roots in a piece of
          classical Latin literature from 45 BC, making it over 2000 years old.
          Richard McClintock, a Latin professor at Hampden-Sydney College in
          Virginia, looked up one of the more obscure Latin words, consectetur,
          from a Lorem Ipsum passage.
        </p>
        <div className="season__productImage">
          <img src={seasonImg} alt="seasonImage"></img>
          <p>
            Lorem Ipsum is not simply random text. It has roots in a piece of
            classical Latin literature from 45 BC, making it over 2000 years
            old.
          </p>
        </div>
        <Button className="small">See more</Button>
      </div>
    </div>
  );
};

export default Season;
