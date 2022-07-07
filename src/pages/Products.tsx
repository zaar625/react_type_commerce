import Filter from 'components/filter/Filter';
import PageHeader from 'components/pageHeader/PageHeader';
const Products = () => {
  return (
    <>
      <PageHeader />
      <div className="container section">
        <Filter />
      </div>
    </>
  );
};

export default Products;
