import { IoLocation } from 'react-icons/io5';
import { FaPhoneAlt } from 'react-icons/fa';
import { formatIndianCurrency } from '@/app/_utils/formatCurrency';
import OrderItems from './OrderItems';
import { format } from 'date-fns';

function OrderDetail({ order }) {
  const createdAt = order?.createdAt;
  const orderDate = format(new Date(createdAt), 'dd MMM yyyy');
  const address = order?.address;
  const fullAddress = `${address?.locality} , ${address?.city} , ${address?.district} , ${address?.state} , ${address?.pincode}`;

  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-5 text-lg mb-32">
      <h1 className="text-center text-3xl">Order Details</h1>
      <div>
        <h1 className="text-xl font-semibold text-accent-400 mb-5 mx-3 mt-10">
          Order ID : {order?.id}
        </h1>
      </div>

      <div className="px-4 sm:px-8 py-3 space-y-2 border-2 border-white rounded-md">
        <h1>
          <span className="text-accent-400">Deliver To :</span> {order?.name}
        </h1>
        <div className="flex items-center gap-2">
          <IoLocation /> <span>{fullAddress}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaPhoneAlt /> <span>{order?.phone}</span>
        </div>
      </div>

      <div className="px-4 sm:px-8 py-3 space-y-2 border-2 border-white rounded-md">
        <h1 className="text-xl font-semibold text-accent-400">
          Payment Details
        </h1>
        <h1>Payment Status : {order?.paymentStatus}</h1>
        <h1>Total Price : {formatIndianCurrency(order?.amount)}</h1>
        <h1 className="break-words">Payment ID : {order?.paymentId}</h1>
      </div>

      <div className="px-4 sm:px-8 py-3 space-y-2 border-2 border-white rounded-md">
        <h1 className="text-xl font-semibold text-accent-400">Status</h1>
        <h1>Order Status : {order?.orderStatus}</h1>
        <h1>Delivery Status : {order?.deliveryStatus}</h1>
        <h1>Order Date : {orderDate}</h1>
        <button className="p-1 bg-accent-600 rounded-md text-white hover:bg-accent-500">
          Track Order
        </button>
      </div>

      <div className="px-4 sm:px-8 py-3 space-y-2 border-2 border-white rounded-md">
        <h1 className="text-xl font-semibold text-accent-400 mb-5">
          Order Items
        </h1>
        <div className="space-y-10">
          {order?.items?.map((item) => (
            <OrderItems item={item} key={item.productId} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
