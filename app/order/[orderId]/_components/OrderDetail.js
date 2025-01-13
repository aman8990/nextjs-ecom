import { IoLocation } from 'react-icons/io5';
import { FaPhoneAlt } from 'react-icons/fa';
import { formatIndianCurrency } from '@/app/_utils/formatCurrency';
import OrderItems from './OrderItems';
import { format } from 'date-fns';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import Link from 'next/link';

function OrderDetail({ order }) {
  const createdAt = order?.createdAt;
  const orderDate = format(new Date(createdAt), 'dd MMM yyyy');
  const address = order?.address;
  const fullAddress = `${address?.locality} , ${address?.city} , ${address?.district} , ${address?.state} , ${address?.pincode}`;

  const handleDownloadInvoice = () => {
    const doc = new jsPDF();

    doc.setFontSize(30);
    doc.text('INVOICE', 80, 15);

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(`Order ID: ${order?.id}`, 10, 30);
    doc.text(`Order Date: ${orderDate}`, 10, 37);
    doc.text(`Name: ${order?.name}`, 10, 44);
    doc.text(`Phone: ${order?.phone}`, 10, 51);
    doc.text(`Email: ${order?.email}`, 10, 58);
    doc.text(`Address: ${fullAddress}`, 10, 65);
    doc.text(`Payment Status: ${order.paymentStatus}`, 10, 72);

    doc.setTextColor(50, 168, 82);
    doc.text(`Total Price: ${formatIndianCurrency(order?.amount)}`, 10, 82);

    const items = order?.items.map((item) => [
      item.productName,
      item.quantity,
      formatIndianCurrency(item.price * item.quantity),
    ]);
    autoTable(doc, {
      startY: 92,
      head: [['Item Name', 'Quantity', 'Price']],
      body: items,
      columnStyles: {
        0: { cellWidth: 120 },
        1: { cellWidth: 20, halign: 'center' },
        2: { cellWidth: 50, cellPadding: { left: 12, top: 2 } },
      },
      headStyles: {
        halign: 'center',
        valign: 'middle',
      },
      styles: {
        fontSize: 10,
      },
      margin: { horizontal: 10 },
    });

    doc.save(`Invoice-${order?.id}.pdf`);
  };

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

        {order?.paymentStatus === 'PAID' && (
          <div>
            {order?.trackingLink && (
              <button className="p-1 bg-accent-600 rounded-md text-white hover:bg-accent-500">
                <Link href={order?.trackingLink}>Track Order</Link>
              </button>
            )}

            <button
              className="p-1 ml-2 bg-accent-600 rounded-md text-white hover:bg-accent-500"
              onClick={handleDownloadInvoice}
            >
              Download Invoice
            </button>
          </div>
        )}
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
