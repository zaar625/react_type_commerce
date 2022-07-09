import { useEffect, useState } from 'react';
import { SwiperSlide, Swiper } from 'swiper/react';
import { db } from 'firebase/firebaseInit';
import ProductCard from 'components/productCard/ProductCard';
import './list.scss';
export interface ProductsType {
  class: string;
  name: string;
  size: string[];
  color: string[];
  image: string;
  ver: string;
  price: number;
  imageDetail: string[];
  stock: number;
}
const TrendItem = () => {
  console.log('trend lendering');
  const [products, setProducts] = useState<ProductsType[]>([]);
  const data: any = [];

  useEffect(() => {
    const fetchData = async () => {
      await db
        .collection('products')
        .where('ver', '==', 'trend')
        .get()
        .then((res) => {
          res.forEach((i) => {
            data.push(i.data());
          });
        });
      setProducts(data);
    };
    fetchData();
  }, []);

  return (
    <div className="list">
      <Swiper grabCursor={true} spaceBetween={10} slidesPerView={'auto'}>
        {products.map((item, index) => (
          <SwiperSlide key={index}>
            <ProductCard item={item} />
            <p>{item.name}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TrendItem;
