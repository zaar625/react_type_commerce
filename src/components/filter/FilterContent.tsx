import ProductCard from 'components/productCard/ProductCard';
import { ProductsType } from 'components/product-list/NewArrival';

import './filterContent.scss';

interface PropsType {
  data: ProductsType[];
}

const FilterContent = ({ data }: PropsType) => {
  return (
    <div className="filter-content ">
      {data.map((item: ProductsType, index: number) => (
        <div className="filter-content__card" key={index}>
          <ProductCard item={item} />
          <p>{item.name}</p>
        </div>
      ))}
    </div>
  );
};

export default FilterContent;
