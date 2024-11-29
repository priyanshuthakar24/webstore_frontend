import React, { useEffect, useState } from "react";

import { Button, Divider } from "antd";

function OrderSummary({ cartItems, shippingInfo, onSubmit }) {
  const [summary, setSummary] = useState({
    itemsPrice: 0,
    taxPrice: 0,
    shippingPrice: 50, // Example flat shipping rate
    totalPrice: 0,
  });

  const handleNext = () => {
    onSubmit(summary);
  };

  useEffect(() => {
    const itemsPrice = cartItems.totalCost;
    const taxPrice = itemsPrice * 0.1; // Example tax rate of 10%
    const totalPrice = itemsPrice + summary.shippingPrice + taxPrice;

    setSummary({
      itemsPrice,
      taxPrice,
      shippingPrice: summary.shippingPrice,
      totalPrice,
    });
  }, [cartItems]);

  return (
    <div className="text-base">
      <h2 className="text-center font-sans lg:text-4xl  text-2xl text-black/45">
        Order Summary
      </h2>
      <ul className="mt-4">
        {cartItems.items?.map((item, index) => (
          <li key={index} className="flex justify-between ">
            <span>
              {item.productId.name} (x{item.quantity})
            </span>
            <span>₹{item.productId.salePrice * item.quantity}</span>
          </li>
        ))}
      </ul>
      <Divider />
      <div>
        <h2 className="text-black/55 font-sans text-xl">Address</h2>
        <Divider className="my-2" />
        <p>+91 {shippingInfo.phone}</p>
        <p>{shippingInfo.address},</p>
        <p>{shippingInfo.city},</p>
        <p>{shippingInfo.state},</p>
        <p>{shippingInfo.postalCode},</p>
        <p>{shippingInfo.country}.</p>
      </div>
      <Divider />
      <div className="my-4 flex-center-between ">
        <p className="space-y-2">
          <p>Items Price</p>
          <p>Tax Price</p>
          <p>Shipping Price</p>
          <p>Total Price</p>
        </p>
        <p className="space-y-2">
          <p>₹{summary.itemsPrice}</p>
          <p>₹{summary?.taxPrice}</p>
          <p>₹{summary.shippingPrice}</p>
          <p>₹{summary?.totalPrice}</p>
        </p>
      </div>
      <Button
        type="primary"
        variant="solid"
        size="large"
        color="default"
        className="w-full"
        onClick={handleNext}
      >
        Proceed to Payment
      </Button>
    </div>
  );
}

export default OrderSummary;
