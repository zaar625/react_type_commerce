import Filter from 'components/filter/Filter';
import PageHeader from 'components/pageHeader/PageHeader';
const Products = () => {
  console.log('product lendering');
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
