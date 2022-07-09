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

  const labels = salesItem().map((i) => i.name);
  const salesPrice = salesItem().map((i) => i.price);

  //   -----------------------------chart.js
  const data = {
    labels: labels,
    datasets: [
      {
        label: '# of Votes',
        data: salesPrice,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };
  return <Doughnut data={data} />;
};
