import React, { useState } from "react";

const ProductView = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <div className="lg:p-5">
      <div className="flex-center flex-col-reverse lg:flex-row gap-4">
        <div className="flex flex-row lg:flex-col gap-1  lg:gap-4">
          {images?.map((item, index) => (
            <img
              src={item}
              width={80}
              height={80}
              key={index}
              onMouseOver={(e) => setCurrentImage(index)}
              // onClick={() => setCurrentImage(0)}
              className="rounded-md cursor-pointer"
              alt="no Product"
            />
          ))}
        </div>
        <div className="h-[40vh] lg:h-[55vh] lg:w-[20vw]">
          <img
            src={images[currentImage]}
            alt="no Product"
            key={images[currentImage]}
            // width={480}
            // height={480}
            className="w-full h-full rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductView;
