import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";

import ProductView from "../image/ProductView";
import CartCount from "../ui/CartCount";
import Wishlistui from "../ui/Wishlistui";
import InstantCheckout from "./checkout/InstantCheckout";
import { useCartcontext } from "../../context/Cartcontext";

import { Avatar, Button, Divider, Radio, Rate, message } from "antd";
import { Dot } from "lucide-react";
import { useAuth } from "../../context/Authcontext";
const SingleProductView = ({ props }) => {
  const nav = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCartcontext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("L");

  // !get the data as props form the single product page
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

  //  ! will add the product to the cart also in the backend
  const handleAddToCart = async () => {
    setIsLoading(true);
    await addToCart(_id, quantity, size);
    setQuantity(1);
    setIsLoading(false);
  };

  // will open the instant checkout page
  const handleBuyNow = () => {
    if (!isAuthenticated) {
      return message.info("please Login!");
    }
    setIsModalOpen(true);
  };

  // incremet the product count
  const handleIncrement = () => {
    setQuantity((prevCount) => prevCount + 1);
  };

  // decremnet the product count
  const handleDecrement = () => {
    if (quantity === 1) return;
    setQuantity((prevCount) => prevCount - 1);
  };

  // set the size
  const handleChange = async (e) => {
    setSize(e.target.value);
  };

  // siez option
  const options = [
    { label: "S", value: "S" },
    { label: "M", value: "M" },
    { label: "L", value: "L" },
    { label: "XL", value: "XL" },
  ];

  const discountprice = Math.round(((mrp - salePrice) / mrp) * 100);

  // Safely create the product images array with checks
  const productImages = [
    mainImage?.url || "", // Main image URL with fallback to an empty string
    ...(subImages ? subImages.map((image) => image.url) : []), // Map through subImages if available
  ].filter((url) => url); // Remove any empty strings in case of missing URLs

  // //! razorpay instant checkout
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // !handle payment method for instant checkout
  const handlePayment = async ({
    shippingInfo,
    totalPrice,
    tax,
    shippingCharge,
    itemsPrice,
  }) => {
    setIsLoading(true);

    const isScriptLoaded = await loadRazorpayScript();
    if (!isScriptLoaded) {
      message.error("Failed to load Razorpay SDK");
      return;
    }

    try {
      const orderItems = [
        {
          product: props._id,
          quantity,
          price: props.salePrice,
          size,
        },
      ];

      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/order/create-order`,
        {
          orderItems,
          shippingInfo,
          totalPrice,
          itemsPrice: itemsPrice,
          taxPrice: tax,
          shippingPrice: shippingCharge,
        },
        { withCredentials: true }
      );

      const options = {
        key: process.env.REACT_APP_RAZORPAY_ID, // Replace with Razorpay key ID
        amount: data.order.totalPrice * 100, // Amount in paisa
        currency: "INR",
        name: "Pinku",
        description: "Order Payment",
        // image: mainImage?.url,
        order_id: data.razorpayOrderId,
        method: ["upi", "card", "netbanking"], // Enable UPI along with other methods
        handler: async function (response) {
          // Payment successful on frontend, display success message
          message.success(
            "Payment initiated successfully. Waiting for confirmation."
          );
          nav("/orders");
        },

        prefill: {
          name: "Priyanshu Thakar",
          email: "myemail@example.com",
          contact: `${shippingInfo.phone}`,
        },

        theme: {
          color: "#cc3333",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment Error: ", error);
      message.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Prodduct Detail componets  */}
      <div className="flex gap-20  flex-col  lg:flex-row ">
        <ProductView images={productImages} />
        <div className="flex flex-col gap-5">
          <h1 className="text-2xl font-semibold capitalize">{name}</h1>
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

                    {/* buy now model and logic  */}
                    <Button
                      color="default"
                      variant="solid"
                      onClick={handleBuyNow}
                      size="large"
                      className="bg-yellow-500  rounded-full text-md font-sans py-2 px-5 hover:shadow-lg text-black"
                    >
                      Buy Now
                    </Button>

                    {/* Checkout Modal */}
                    <InstantCheckout
                      visible={isModalOpen}
                      onClose={() => setIsModalOpen(false)}
                      product={props}
                      quantity={quantity}
                      size={size}
                      onPayment={handlePayment}
                      isLoading={isLoading}
                    />

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
                      <Button
                        color="default"
                        variant="solid"
                        onClick={handleBuyNow}
                        size="large"
                        className="bg-yellow-500 w-full rounded-full text-md font-sans py-2 px-5 hover:shadow-lg text-black"
                      >
                        Buy Now
                      </Button>
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
          {reviews?.length > 0 ? (
            reviews?.map((item) => (
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
            ))
          ) : (
            <p>No Reviews for this Product!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleProductView;
