import { Button, Input } from "antd";
import React from "react";

const OrderSummary = ({ product }) => {
  return (
    <div className="space-y-5">
      <p className="font-bold text-xl">Order Summary</p>
      <Input
        // color="default"
        variant="solid"
        placeholder="Enter Coupan Code Here"
        size="large"
        className=" w-full rounded-none"
      />
      <div className="space-y-3">
        <p className="flex-center justify-between ">
          <span>SubTotal: </span>
          <span>${product.totalCost}</span>
        </p>
        <p className="flex-center justify-between gap-2 lg:gap-10">
          <span>Shipping Charge: </span>
          <span>Calculated at the next step</span>
        </p>
        <hr className="border-black border-1" />
        <p className="flex-center justify-between">
          <span>Total</span>
          <span>${product.totalCost}</span>
        </p>
      </div>
      <Button
        color="default"
        variant="solid"
        size="large"
        htmlType="submit"
        className="w-full rounded-none"
      >
        Continue to checkout
      </Button>
    </div>
  );
};

export default OrderSummary;