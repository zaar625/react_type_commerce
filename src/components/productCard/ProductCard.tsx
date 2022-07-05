import { Link } from 'react-router-dom';
import { ProductsType } from 'components/product-list/NewArrival';
import './productCard.scss';

interface Props {
  item: ProductsType;
}

const ProductCard = (props: Props) => {
  const item = props.item;
  return (
    <Link to={`/products/${item.name}`}>
      <div
        className="product-card"
        style={{ backgroundImage: `url(${item.image})` }}
      >
        <div className="product-card__hover">
          <p className="product-card__hover__title">{item.name}</p>
          <div className="product-card__hover__color">
            {item.color.map((e, i) => (
              <div key={i} style={{ backgroundColor: `${e}` }}></div>
            ))}
          </div>
          <span>{item.price}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
