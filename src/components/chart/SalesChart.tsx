import { useEffect, useState } from 'react';
import { db } from 'firebase/firebaseInit';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

export const SalesChart = () => {
  const [sales, setSales] = useState<any[]>([]);

  useEffect(() => {
    db.collection('sales')
      .get()
      .then((res) => {
        const salesData: any[] = [];
        res.forEach((res) => {
          salesData.push(res.data());
        });
        setSales(salesData);
      });
    salesItem();
  }, []);

  const salesItem = () => {
    const newSalesItem = [];
    for (const key in sales) {
      const obj1 = sales[key];
      for (const key in obj1) {
        const obj2 = obj1[key];
        newSalesItem.push({
          name: obj2.name,
          price: obj2.price * obj2.quantity,
        });
      }
    }
    return newSalesItem;
  };
  console.log(salesItem());
  const labels = salesItem().map((i) => i.name);
  const salesPrice = salesItem().map((i) => i.price);

  const dynamicColors = function () {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return 'rgb(' + r + ',' + g + ',' + b + ', 0.7)';
  };

  const backgroundCol = [];
  for (let i = 0; i < salesItem().length; i++) {
    backgroundCol.push(dynamicColors());
  }
  console.log(backgroundCol);
  //   -----------------------------chart.js

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Product Sales',
      },
    },
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: '# of Votes',
        data: salesPrice,
        backgroundColor: backgroundCol,

        borderWidth: 2,
      },
    ],
  };
  return <Doughnut options={options} data={data} />;
};
