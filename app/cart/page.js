import getCurrentUser from '../_actions/getCurrentUser';
import CartItems from './_components/CartItems';

async function Page() {
  const currentUser = await getCurrentUser();

  return (
    <div>
      <CartItems currentUser={currentUser} />
    </div>
  );
}

export default Page;
