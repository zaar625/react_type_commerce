import ProductCard from 'components/productCard/ProductCard';

import './filterContent.scss';

const FilterContent = (props: any) => {
  return (
    <div className="filter-content ">
      {props.data.map((item: any, index: number) => (
        <div className="filter-content__card" key={index}>
          <ProductCard item={item} />
          <p>{item.name}</p>
        </div>
      ))}
    </div>
  );
};

export default FilterContent;
