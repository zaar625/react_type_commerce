import './admin.scss';

import StockChart from 'components/chart/StockChart';
import { SalesChart } from 'components/chart/SalesChart';

const Admin = () => {
  return (
    <div>
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
    </div>
  );
};

export default Admin;
