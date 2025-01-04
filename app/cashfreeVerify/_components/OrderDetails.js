import Button from '@/app/_components/Button';
import { formatIndianCurrency } from '@/app/_utils/formatCurrency';
import { useRouter } from 'next/navigation';

function OrderDetails({ order }) {
  const router = useRouter();
  const address = order?.address;
  const fullAddress = `${address?.locality} , ${address?.city} , ${address?.district} , ${address?.state} , ${address?.pincode}`;

  if (order?.paymentStatus === 'FAILED')
    return (
      <div className="mb-20">
        <div className="flex flex-col mt-16 md:mt-32 max-w-[33rem] mx-auto text-lg border-2 border-white rounded-md">
          <div className="mx-4 md:mx-10 my-4 md:my-10 space-y-2">
            <div>Order ID : {order.id}</div>
            <div>
              Payment Status :{' '}
              <span className="text-red-600">{order?.paymentStatus}</span>
            </div>
            <div className="break-words">Payment Id : {order?.paymentId}</div>
          </div>
        </div>

        <div className="w-28 flex mx-auto mt-6">
          <Button
            onClick={() => {
              router.push('/');
            }}
          >
            Go to home
          </Button>
        </div>
      </div>
    );

  if (order?.paymentStatus === 'PAID')
    return (
      <div className="mb-32">
        <div className="flex flex-col mt-16 max-w-[33rem] mx-auto text-lg border-2 border-white rounded-md">
          <div className="mx-4 my-4 md:my-10 space-y-4">
            <div>Order ID : {order.id}</div>

            <div>
              Payment Status :{' '}
              <span className="text-green-600">{order.paymentStatus}</span>
            </div>

            <div>Phone no : {order.phone}</div>

            <div>Email : {order.email}</div>

            <div>Amount : {formatIndianCurrency(order.amount)}</div>

            <div>Address : {fullAddress}</div>

            <div>
              <h1>Order Items : </h1>
              <div className="space-y-1">
                {order?.items?.map((item, i) => (
                  <div key={item.productId} className="flex gap-1">
                    <h1>{i + 1}.</h1>
                    <h1>
                      {item.productName} - Quantity({item.quantity})
                    </h1>
                  </div>
                ))}
              </div>
            </div>

            <div className="break-words">Payment Id : {order.paymentId}</div>
          </div>
        </div>

        <div className="w-28 flex mx-auto mt-6">
          <Button
            onClick={() => {
              router.push('/');
            }}
          >
            Go to home
          </Button>
        </div>
      </div>
    );

  return null;
}

export default OrderDetails;
