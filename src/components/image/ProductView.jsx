import React, { useState } from "react";

const ProductView = ({ images, style }) => {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <div className="lg:p-5">
      <div className="flex-center flex-col-reverse lg:flex-row gap-4">
        <div className="flex flex-row lg:flex-col gap-1  lg:gap-4">
          <img
            src={images[0]}
            width={80}
            height={80}
            onMouseOver={(e) => setCurrentImage(0)}
            // onClick={() => setCurrentImage(0)}
            className="rounded-md cursor-pointer"
            alt="no Product"
          />
          <img
            src={images[1]}
            width={80}
            height={80}
            onMouseOver={(e) => setCurrentImage(1)}
            // onClick={() => setCurrentImage(1)}
            className="rounded-md cursor-pointer"
            alt="no Product"
          />
          <img
            src={images[2]}
            width={80}
            height={80}
            onMouseOver={(e) => setCurrentImage(2)}
            // onClick={() => setCurrentImage(2)}
            className="rounded-md cursor-pointer"
            alt="no Product"
          />
          <img
            src={images[3]}
            width={80}
            height={80}
            onMouseOver={(e) => setCurrentImage(3)}
            // onClick={() => setCurrentImage(3)}
            className="rounded-md cursor-pointer"
            alt="no Product"
          />
        </div>
        <div className="h-[40vh] lg:h-[55vh] lg:w-[20vw]">
          <img
            src={images[currentImage]}
            alt="no Product"
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
