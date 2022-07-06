import React from 'react';
import { useEffect, useState } from 'react';
import { db } from 'firebase/firebaseInit';
import { Bar } from 'react-chartjs-2';
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
  const [productsData, setProductsData] = useState<any[]>([]);
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
        label: 'data',
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
        text: 'Chart.js Bar Chart',
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
