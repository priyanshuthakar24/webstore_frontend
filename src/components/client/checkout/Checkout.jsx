import React, { useState } from "react";
import { Steps, Button, message } from "antd";
import AddressForm from "./AddressForm";
import OrderSummary from "./OrderSummary";
import Payment from "./Payment";
import Coupan from "./Coupan";

const { Step } = Steps;

function Checkout({ cartItems, onPaymentSuccess }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [shippingInfo, setShippingInfo] = useState({});
  const [orderSummary, setOrderSummary] = useState({
    itemsPrice: 0,
    taxPrice: 0,
    shippingPrice: 0,
    totalPrice: 0,
  });
  const [coupan, setCoupanCode] = useState("");
  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  const handleAddressSubmit = (addressData) => {
    setShippingInfo(addressData);
    nextStep();
  };

  const handleOrderSummary = (summary) => {
    setOrderSummary(summary);
    nextStep();
  };
  const handleCoupanCode = (coupan) => {
    setCoupanCode(coupan);
    nextStep();
  };
  const steps = [
    {
      title: "Coupan",
      content: <Coupan product={cartItems} onSubmit={handleCoupanCode} />,
    },
    {
      title: "Address",
      content: (
        <AddressForm
          onSubmit={handleAddressSubmit}
          shippingInfo={shippingInfo}
        />
      ),
    },
    {
      title: "Order Summary",
      content: (
        <OrderSummary
          cartItems={cartItems}
          shippingInfo={shippingInfo}
          onSubmit={handleOrderSummary}
        />
      ),
    },
    {
      title: "Payment",
      content: (
        <Payment
          orderSummary={orderSummary}
          shippingInfo={shippingInfo}
          cartItems={cartItems}
          onPaymentSuccess={onPaymentSuccess}
        />
      ),
    },
  ];

  return (
    <div className="max-w-2xl mx-auto ">
      <div className="px-4">
        <Steps progressDot direction="horizontal" current={currentStep}>
          {steps.map((item, index) => (
            <Step key={index} title={item.title} />
          ))}
        </Steps>
      </div>
      <div className="mt-4">{steps[currentStep].content}</div>
      <div className="flex justify-between mt-4">
        {currentStep > 0 && (
          <Button className="w-full" size="large" onClick={prevStep}>
            Previous
          </Button>
        )}
      </div>
    </div>
  );
}

export default Checkout;
