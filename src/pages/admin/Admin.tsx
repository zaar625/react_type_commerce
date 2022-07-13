import StockChart from 'components/chart/StockChart';
import { SalesChart } from 'components/chart/SalesChart';
import PageHeader from 'components/pageHeader/PageHeader';
import { BsCheckCircleFill } from 'react-icons/bs';
import Weather from 'components/weather/Weather';
import './admin.scss';

const Admin = () => {
  return (
    <>
      <PageHeader />
      <Weather />
      <div className="admin section container">
        <div className="admin__charts">
          <div className="admin__charts__stock">
            <div className="admin__title">
              <BsCheckCircleFill />
              <p>Please keep adequate stock</p>
            </div>
            <StockChart />
          </div>
          <div className="admin__charts__sales">
            <SalesChart />
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
