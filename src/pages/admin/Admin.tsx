import StockChart from 'components/chart/StockChart';
import { SalesChart } from 'components/chart/SalesChart';
import PageHeader from 'components/pageHeader/PageHeader';
import './admin.scss';

const Admin = () => {
  return (
    <>
      <PageHeader />
      <div className="admin">
        <div className="admin__charts">
          <div className="admin__charts__stock">
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
