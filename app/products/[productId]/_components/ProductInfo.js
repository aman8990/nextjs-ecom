import Image from 'next/image';

function ProductInfo({ fullDescription, images }) {
  return (
    <div>
      {images.map((img, index) => (
        <div
          key={index}
          className="flex flex-col items-center text-center my-10 gap-5 md:gap-2"
        >
          <Image
            src={img || '/grey.jpg'}
            alt={`Image ${index}`}
            width={200}
            height={200}
            className=" rounded-md"
          />

          <div className="mx-2 text-xs md:text-lg">
            {fullDescription[index]}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductInfo;
