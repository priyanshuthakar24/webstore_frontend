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
      <div className="flex gap-20  flex-col  lg:flex-row ">
        <ProductView images={productImages} />
        {/* <p>{JSON.stringify(props)}</p> */}
        <div className="flex flex-col gap-5">
          <h1 className="text-2xl font-bold   ">{name}</h1>
          <p className="text-gray-600 "> {description}</p>
          <p>{category}</p>
          <span>
            {bulletPoints &&
              bulletPoints.map((item) => (
                <span className=" flex lg:items-center" key={item}>
                  <Dot size={25} />
                  {item}
                </span>
              ))}
          </span>
          <div className="flex lg:gap-6 gap-2 pl-3 ">
            <span className="line-through text-2xl text-slate-500 ">
              ₹{mrp}.00
            </span>
            <span className="font-bold text-2xl">₹{salePrice}.00</span>
            <span
              className=" text-white font-bold  text-sm rounded-md px-1 flex justify-center items-center "
              style={{ background: "green" }}
            >
              {discountprice}% OFF
            </span>
          </div>
          <table className="border-solid border-1 border-black w-1/3">
            <thead className="border-solid border-1 border-black">
              <tr style={{ border: "1px solid black" }}>
                <th className="border-solid border-1 border-black">Size</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody className="border-solid border-1 border-black">
              {stock &&
                stock.map((item) => (
                  <tr className="border-solid border-1 border-black text-center">
                    <td className="border-solid border-1 border-black">
                      {item.size}
                    </td>
                    <td> {item.quantity}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SingleProductView;
