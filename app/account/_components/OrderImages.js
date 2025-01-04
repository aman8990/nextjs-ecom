import Image from 'next/image';

function orderImages({ item }) {
  return (
    <div className="w-[2rem] h-[2rem] md:w-[3rem] md:h-[3rem] flex items-center opacity-[95%]">
      <Image src={item.photo} width={200} height={200} alt="product-image" />
    </div>
  );
}

export default orderImages;
