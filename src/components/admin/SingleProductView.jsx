import React from "react";
import ProductView from "../image/ProductView";
import { Dot } from "lucide-react";

const SingleProductView = ({ props }) => {
  const {
    name,
    mainImage,
    subImages,
    category,
    mrp,
    salePrice,
    stock,
    description,
    bulletPoints,
  } = props;
  const discountprice = Math.round(((mrp - salePrice) / mrp) * 100);
  // Safely create the product images array with checks
  const productImages = [
    mainImage?.url || "", // Main image URL with fallback to an empty string
    ...(subImages ? subImages.map((image) => image.url) : []), // Map through subImages if available
  ].filter((url) => url); // Remove any empty strings in case of missing URLs

  return (
    <div>
      <div className="flex gap-10 justify-between flex-col  lg:flex-row ">
        <ProductView images={productImages} />
        {/* <p>{JSON.stringify(props)}</p> */}
        <div className="flex flex-col gap-5">
          <h1 className="text-2xl font-bold   ">{name}</h1>
          <p className="text-gray-600 "> {description}</p>
          <p>{category}</p>
          <span>
            {bulletPoints &&
              bulletPoints.map((item) => (
                <span className=" flex items-center" key={item}>
                  <Dot size={25} />
                  {item}
                </span>
              ))}
          </span>
          <div className="flex lg:gap-6 gap-4 ">
            <span className="line-through text-2xl text-slate-500 ">
              ₹ {mrp}.00
            </span>
            <span className="font-bold text-2xl">₹ {salePrice}.00</span>
            <span
              className=" text-white font-bold  text-sm rounded-md px-2 flex justify-center items-center "
              style={{ background: "green" }}
            >
              {discountprice} % OFF
            </span>
          </div>
          <span>Qty : {stock}</span>
        </div>
      </div>
    </div>
  );
};

export default SingleProductView;
