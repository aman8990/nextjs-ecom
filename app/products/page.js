import Products from './_components/Products';

export const revalidate = 60;

function Page() {
  return (
    <div>
      <h1 className="text-4xl underline text-center md:my-10 mb-10 mt-10">
        Products
      </h1>
      <Products />
    </div>
  );
}

export default Page;
