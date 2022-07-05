/* eslint-disable no-case-declarations */
import { useCallback, useEffect, useState } from 'react';
import { db } from 'firebase/firebaseInit';
import CheckBox from 'components/checkbox/CheckBox';
import { AiOutlineSearch } from 'react-icons/ai';
import Button from 'components/button/Button';
import './filter.scss';
import FilterContent from './FilterContent';

interface InitFilter {
  class: string[];
  color: string[];
  size: string[];
}

const Filter = () => {
  const initFilter: InitFilter = {
    class: [],
    color: [],
    size: [],
  }; //필터 초기값

  const ProductInfo = {
    class: [
      'MARCE',
      'BELL',
      'NUOVO',
      'FLOUI',
      'LUCIO',
      'BRUNI',
      'TINDY',
      'CASUAL',
    ],
    color: ['black', 'white', 'navy', 'brown', 'pink', 'peach'],
    size: ['s', 'm'],
  };

  const [products, setProducts] = useState<any[]>([]); //전체상품 상태관리
  const [filerProducts, setFilterProducts] = useState<any[]>([]); //필터적용상품 관리
  const [filter, setFilter] = useState(initFilter);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const Alldata: any[] = [];

    const fetchAllData = async () => {
      await db
        .collection('products')
        .get()
        .then((res) => {
          res.forEach((doc) => {
            Alldata.push(doc.data());
          });
        });
      setProducts(Alldata);
      setFilterProducts(Alldata);
    };
    fetchAllData();
  }, []);

  // 체크항목에 따라 상품리스트 업데이트되는 함수
  const updateProducts = useCallback(() => {
    let temp = products;
    console.log(temp);
    if (filter.class.length > 0) {
      temp = temp.filter((e: any) => filter.class.includes(e.class));
    }
    if (filter.color.length > 0) {
      temp = temp.filter((e) => {
        const check = e.color.find((color: string) =>
          filter.color.includes(color),
        );
        return check;
      });
    }

    setFilterProducts(temp);
  }, [filter]);

  // 필터 항목 모음
  const filterSelect = (type: string, checked: boolean, item: string) => {
    if (checked) {
      switch (type) {
        case 'Class':
          setFilter({ ...filter, class: [...filter.class, item] });
          break;
        case 'Color':
          setFilter({ ...filter, color: [...filter.color, item] });
          break;
        case 'Size':
          setFilter({ ...filter, size: [...filter.size, item] });
          break;
      }
    } else {
      switch (type) {
        case 'Class':
          const newClass = filter.class.filter((e) => e !== item);
          setFilter({ ...filter, class: newClass });
          break;
        case 'Color':
          const newColor = filter.color.filter((e) => e !== item);
          setFilter({ ...filter, color: newColor });
          break;
        case 'Size':
          const newSize = filter.size.filter((e) => e !== item);
          setFilter({ ...filter, size: newSize });
          break;
      }
    }
  };

  // 검색기능
  const search = (e: any) => {
    e.preventDefault();
    setSearchText(e.target.value);
  };

  useEffect(() => {
    if (searchText === '') return;
    setFilterProducts(() =>
      products.filter((item) =>
        item.name.toLowerCase().match(searchText.toLowerCase()),
      ),
    );
  }, [searchText]);

  useEffect(() => {
    updateProducts();
  }, [updateProducts]);
  console.log(filerProducts);

  return (
    <>
      <div className="filter mb-4">
        {/* 분류 */}
        <div className="filter__widget">
          <h4 className="filter__title">Class</h4>
          <div className="filter__content">
            {ProductInfo.class.map((item, index) => (
              <div key={index} className="filter__content__item">
                <CheckBox
                  label={item}
                  onChange={(input: any) => {
                    filterSelect('Class', input.checked, item);
                  }}
                ></CheckBox>
              </div>
            ))}
          </div>
        </div>
        {/* 컬러 */}
        <div className="filter__widget">
          <h4 className="filter__title">Color</h4>
          <div className="filter__content">
            {ProductInfo.color.map((item, index) => (
              <div key={index} className="filter__content__item">
                <CheckBox
                  label={item}
                  onChange={(input: any) => {
                    filterSelect('Color', input.checked, item);
                  }}
                ></CheckBox>
              </div>
            ))}
          </div>
        </div>
        <div className="filter__input">
          <form>
            <input
              onChange={search}
              type="text"
              placeholder=" 상품명을 검색해 주세요"
              id="text"
            />
            <label htmlFor="text"></label>
            <AiOutlineSearch />
          </form>
        </div>
      </div>
      <FilterContent data={filerProducts} />
    </>
  );
};

export default Filter;
