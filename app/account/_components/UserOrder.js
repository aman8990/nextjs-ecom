import { formatIndianCurrency } from '@/app/_utils/formatCurrency';
import OrderImages from './OrderImages';
import { useRouter } from 'next/navigation';

function UserOrder({ order }) {
  const router = useRouter();

  const handleViewDetails = () => {
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || {};

    storedOrders[order.id] = order;

    localStorage.setItem('orders', JSON.stringify(storedOrders));
    router.push(`/order/${order.id}`);
  };

  return (
    <div className="space-y-4 border-2 border-white p-2 rounded-md text-sm md:text-lg">
      <div className="flex justify-between gap-2 sm:gap-[10rem] lg:gap-[20rem] border-b border-white">
        <h1 className="text-accent-400">Order Id : {order.id}</h1>
        <button onClick={handleViewDetails} className="hover:text-accent-400">
          VIEW DETAILS
        </button>
      </div>

      <div>
        <h1>Order Items : </h1>
        <div className="flex gap-2">
          {order.items.map((item) => (
            <OrderImages item={item} key={item.productId} />
          ))}
        </div>
      </div>

      <div>
        <h1>
          Total Price :{' '}
          <span className="text-red-500">
            {formatIndianCurrency(order.amount)}
          </span>
        </h1>
      </div>
    </div>
  );
}

export default UserOrder;
