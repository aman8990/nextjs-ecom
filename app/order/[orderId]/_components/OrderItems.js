import { formatIndianCurrency } from '@/app/_utils/formatCurrency';
import Image from 'next/image';

function OrderItems({ item }) {
  return (
    <div>
      <div className="h-[3rem] w-[3rem]">
        <Image src={item.photo} width={200} height={200} alt="item-image" />
      </div>
      <h1>{item.productName}</h1>
      <h1>Price : {formatIndianCurrency(item.price)}</h1>
      <h1>Quantity : {item.quantity}</h1>
      <h1>Total Price : {formatIndianCurrency(item.price * item.quantity)}</h1>
    </div>
  );
}

export default OrderItems;
