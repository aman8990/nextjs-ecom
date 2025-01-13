import { fetchProducts } from '@/app/_libs/api';
import ProductsList from './ProductsList';

async function Products() {
  const products = await fetchProducts();

  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 w-full gap-x-5 gap-y-20 mb-32 md:mb-20">
      {products.map((product) => (
        <ProductsList product={product} key={product.id} />
      ))}
    </div>
  );
}

export default Products;
