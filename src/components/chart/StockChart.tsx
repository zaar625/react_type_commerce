import { useEffect, useState } from 'react';
import { db } from 'firebase/firebaseInit';
import { Bar } from 'react-chartjs-2';
import { ProductsType } from 'components/product-list/TrendItem'; //타입
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const StockChart = () => {
  const [productsData, setProductsData] = useState<ProductsType[]>([]);
  const stockNum = productsData.map((i) => i.stock);

  useEffect(() => {
    const data: any[] = [];

    db.collection('products')
      .get()
      .then((res) => {
        res.forEach((res) => {
          data.push(res.data());
        });
        setProductsData(data);
      });
  }, []);
  //   ----------------------------chart.js
  // labels는 정해진 변수인듯. 변수명을 다르게 하면 데이터가 출력이 안됨.
  const labels = productsData.map((i) => i.name);
  const stockdata = {
    labels,
    datasets: [
      {
        label: 'stock state',
        data: stockNum,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Product Stock',
      },
    },
  };
  return (
    <div>
      <Bar options={options} data={stockdata} />
    </div>
  );
};

export default StockChart;
