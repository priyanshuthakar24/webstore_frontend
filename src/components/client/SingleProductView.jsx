import React, { useState } from "react";
import ProductView from "../image/ProductView";
import { Dot, Heart } from "lucide-react";
import { message, Rate } from "antd";
import CartCount from "../ui/CartCount";
import axios from "axios";
const SingleProductView = ({ props }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const handleIncrement = () => {
    setQuantity((prevCount) => prevCount + 1);
  };
  const handleDecrement = () => {
    if (quantity === 0) return;
    setQuantity((prevCount) => prevCount - 1);
  };

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/cart/add`,
        { productId: _id, quantity },
        { withCredentials: true }
      );
      if (res) {
        message.success("product Added to cart");
        setQuantity(0);
      }
    } catch (error) {
      message.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  const {
    _id,
    name,
    mainImage,
    subImages,
    category,
    mrp,
    salePrice,
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
          <p className="lg:pl-3 flex items-center justify-around lg:justify-start gap-5">
            <span className="space-x-5">
              <Rate
                disabled
                defaultValue={4.5}
                allowHalf
                className="text-yellow-500 "
              />
              <span>4</span>
            </span>
            <button className="px-4 py-3  rounded-lg hover:bg-black/5 lg:hidden ">
              <Heart />
            </button>
          </p>
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

          {/* add to cart Oprion Desktop */}
          <div className="lg:flex items-center gap-10 hidden">
            <CartCount
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
              value={quantity}
            />

            <button
              disabled={isLoading}
              onClick={handleAddToCart}
              className="hover:bg-black/5 px-4 py-3 rounded-lg font-sans"
            >
              Add To Cart
            </button>
            <button
              type="button"
              className="bg-yellow-500 rounded-full text-md font-sans py-2 px-5 hover:shadow-lg"
              size="large"
            >
              Buy Now
            </button>
            <button className="px-4 py-3 rounded-lg hover:bg-black/5 ">
              <Heart />
            </button>
          </div>

          {/* mobile view  */}
          <div className="flex flex-col items-center gap-2 lg:hidden mb-10">
            <div className="flex items-center">
              <CartCount
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
                value={quantity}
              />

              <button className="hover:bg-black/5 px-4 py-3 rounded-lg font-sans">
                Add To Cart
              </button>
            </div>
            <div className="w-full">
              <button
                type="button"
                className="bg-yellow-500 w-full rounded-full text-md font-sans py-2 px-5 hover:shadow-lg"
                size="large"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductView;
