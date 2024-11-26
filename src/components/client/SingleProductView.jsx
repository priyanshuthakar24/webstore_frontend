import React, { useState } from "react";
import ProductView from "../image/ProductView";
import { Dot } from "lucide-react";
import { Avatar, Divider, Radio, Rate } from "antd";
import CartCount from "../ui/CartCount";
import { useCartcontext } from "../../context/Cartcontext";
import Wishlistui from "../ui/Wishlistui";
import moment from "moment";

const SingleProductView = ({ props }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("L");
  const { addToCart } = useCartcontext();
  const handleIncrement = () => {
    setQuantity((prevCount) => prevCount + 1);
  };
  const handleDecrement = () => {
    if (quantity === 0) return;
    setQuantity((prevCount) => prevCount - 1);
  };
  const handleChange = async (e) => {
    // await fetchproductdetail(_id);
    setSize(e.target.value);
  };
  const handleAddToCart = async () => {
    setIsLoading(true);
    await addToCart(_id, quantity, size);
    setQuantity(1);
    setIsLoading(false);
  };
  const options = [
    { label: "S", value: "S" },
    { label: "M", value: "M" },
    { label: "L", value: "L" },
    { label: "XL", value: "XL" },
  ];
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
    stock,
    reviews,
    averageRating,
  } = props;
  const discountprice = Math.round(((mrp - salePrice) / mrp) * 100);
  // Safely create the product images array with checks
  const productImages = [
    mainImage?.url || "", // Main image URL with fallback to an empty string
    ...(subImages ? subImages.map((image) => image.url) : []), // Map through subImages if available
  ].filter((url) => url); // Remove any empty strings in case of missing URLs

  return (
    <div>
      {/* Prodduct Detail componets  */}
      <div className="flex gap-20  flex-col  lg:flex-row ">
        <ProductView images={productImages} />
        <div className="flex flex-col gap-5">
          <h1 className="text-2xl font-bold">{name}</h1>
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
          <span className="w-1/2">
            <Radio.Group
              onChange={handleChange}
              options={options}
              defaultValue={"L"}
              block
              buttonStyle="outline"
              optionType="button"
              size="large"
            />
          </span>
          <div className="lg:pl-3 flex items-center justify-around lg:justify-start gap-5">
            <span className="space-x-5">
              <Rate
                disabled
                value={averageRating}
                allowHalf
                className="text-yellow-500 "
              />
              <span>{averageRating}</span>
            </span>
            <p className="lg:hidden">
              <Wishlistui product={_id} />
            </p>
          </div>
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
          {stock &&
            stock.map((item) =>
              item.size === size ? (
                item.quantity > 0 ? (
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
                    <Wishlistui product={_id} />
                  </div>
                ) : (
                  <p className="hidden  lg:flex">Out of Stock</p>
                )
              ) : null
            )}
          {/* mobile view  */}
          {stock &&
            stock.map((item) =>
              item.size === size ? (
                item.quantity > 0 ? (
                  <div className="flex flex-col items-center gap-2 lg:hidden mb-10">
                    <div className="flex items-center">
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
                ) : (
                  <p className=" mb-10 lg:hidden">Out of Stock</p>
                )
              ) : null
            )}
        </div>
      </div>
      {/* Product Review Componets */}
      <div className="my-5">
        <div className="flex-center justify-between">
          <p className="text-xl font-bold">Reviews</p>
        </div>
        <Divider />
        <div>
          {reviews?.map((item) => (
            <div className="mb-3">
              <div className="flex-center gap-5 mb-2">
                <Avatar shape="square" size={45}>
                  {item?.name[0].toUpperCase()}
                </Avatar>
                <p>
                  <p className="font-bold capitalize">{item.name}</p>
                  <span>{moment(item.createdAt).format("DD MMM yyyy")}</span>
                </p>
              </div>
              <div>
                <Rate
                  value={item.rating}
                  disabled
                  className="text-yellow-500 "
                />
                <p>{item.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleProductView;
