import { fetchProductById, fetchProducts } from '@/app/_libs/api';
import Product from './_components/Product';
import { ObjectId } from 'bson';

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { productId } = await params;
  const product = await fetchProductById(productId);
  if (!product) {
    return { title: 'Product Not Found' };
  }

  return { title: `${product.name}` };
}

export async function generateStaticParams() {
  try {
    const products = await fetchProducts();
    return products.map((product) => ({
      productId: String(product.id),
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export const dynamicParams = true;

async function Page({ params }) {
  const { productId } = await params;

  if (!ObjectId.isValid(productId)) {
    return (
      <div className="flex justify-center text-3xl mt-20">
        Invalid Product ID
      </div>
    );
  }

  let product;
  try {
    product = await fetchProductById(productId);
  } catch (error) {
    return (
      <div className="flex justify-center text-3xl mt-20">
        An error occurred while fetching the product.
      </div>
    );
  }

  if (!product)
    return (
      <div className="flex justify-center text-3xl mt-20">
        Product Not Found
      </div>
    );

  return (
    <div className="flex justify-center mx-3 md:mx-10 mt-10 mb-24  md:my-20">
      <Product product={product} />
    </div>
  );
}

export default Page;
