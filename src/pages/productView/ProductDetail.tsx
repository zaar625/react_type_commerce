import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { db } from 'firebase/firebaseInit';
import { ProductsType } from 'components/product-list/NewArrival';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper';
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from 'react-icons/ai';
import Button from 'components/button/Button';
import { useSelector } from 'react-redux';
import { userAddItem } from 'redux/logincartIems';
import { addItem } from 'redux/cartItem';
import './product.scss';

const ProductDetail = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const UserloginState = useSelector((state: any) => state.login.login);

  const [activeThumb, setActiveThumb] = useState<any>(); //슬라이드썸네일 상탱
  const [productDetail, setProductDetail] = useState<ProductsType[]>([]); //파이어베이스 데이터 가져오기
  const [color, setColor] = useState<string>(''); //색상선택
  const [quantity, setQuantity] = useState(1); //수량
  const data: any[] = [];

  useEffect(() => {
    //params name 아이템 가져오기
    const fetchData = async () => {
      await db
        .collection('products')
        .where('name', '==', `${params.name}`)
        .get()
        .then((res) => {
          res.forEach((i) => {
            data.push(i.data());
          });
        });
      setProductDetail(data);
    };
    fetchData();
    setColor('');
  }, [UserloginState]);

  // 카트에 추가하기
  const addToCart = () => {
    if (color !== '') {
      const newItem = {
        name: productDetail[0].name,
        color: color,
        price: productDetail[0].price,
        image: productDetail[0].image,
        quantity: quantity,
      };

      if (UserloginState) {
        dispatch(userAddItem(newItem));
        alert('장바구니에 담겼습니다.');
      } else {
        dispatch(addItem(newItem));
        alert('장바구니에 담겼습니다.');
      }

      // if (dispatch(addItem(newItem))) {
      //   alert('장바구니에 담겼습니다.');
      //   // window.location.replace('/');
      // } else {
      //   alert('다시 한번 시도해주세요.');
      // }
    } else {
      alert('색상을 선택해 주세요');
    }
  };
  //수량함수
  const updateQuantity = (type: string) => {
    if (type === 'plus') {
      setQuantity(quantity + 1);
    } else {
      setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
    }
  };

  return (
    <>
      {productDetail.length > 0 ? (
        <div className="productDetail">
          <div className="productDetail__info">
            <div className="productDetail__info__container">
              <p>소재, 세탁 방법 및 원산지</p>
              <p>JOIN LIFE</p>
              <p>Care for filber: 30% 이상 재생 폴리에스터 사용</p>
              <p>
                환경에 미치는 영향을 줄일 수 있는 기법과 원자재를 이용하여
                제조되는 제품에 Join Lite라는 이름의 태그를 부착합니다.
              </p>
            </div>
          </div>
          <div className="productDetail__imageBox">
            <Swiper
              loop={false}
              spaceBetween={10}
              navigation={true}
              modules={[Navigation, Thumbs]}
              grabCursor={true}
              thumbs={{ swiper: activeThumb }}
              className="productDetail__imageBox__slider"
            >
              {productDetail[0].imageDetail.map((item, index) => (
                <SwiperSlide key={index}>
                  <img src={item} alt="product images" />
                </SwiperSlide>
              ))}
            </Swiper>
            <Swiper
              onSwiper={setActiveThumb}
              loop={false}
              spaceBetween={10}
              slidesPerView={4}
              modules={[Navigation, Thumbs]}
              className="product-images-slider-thumbs"
            >
              {productDetail[0].imageDetail.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="product-images-slider-thumbs-wrapper">
                    <img src={item} alt="product images" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="productDetail__des">
            <div className="productDetail__des__container">
              <h1>{productDetail[0].name}</h1>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industrys standard dummy text
                ever since the 1500s,
              </p>
              <p>색상을 선택해 주세요.</p>
              <div className="productDetail__des__container__color">
                {productDetail[0].color.map((e, i) => (
                  <div
                    key={i}
                    className={`color ${color === e ? 'color_active' : ''}`}
                    onClick={() => setColor(e)}
                  >
                    <div
                      className="circle"
                      style={{ backgroundColor: `${e}` }}
                    ></div>
                    <div>{e}</div>
                  </div>
                ))}
              </div>
              <div className="productDetail__des__quan"></div>
            </div>
            <div className="productDetail__des__quan">
              <AiOutlineMinusSquare onClick={() => updateQuantity('minus')} />
              <div>{quantity}</div>
              <AiOutlinePlusSquare onClick={() => updateQuantity('plus')} />
            </div>
            <div className="productDetail__des__btns">
              <Button onClick={() => addToCart()}>Cart</Button>
              <Button>구매하기</Button>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default ProductDetail;
