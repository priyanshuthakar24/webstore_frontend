import { Button, Input, message } from "antd";
import React, { useState } from "react";
import axios from "axios";
const Coupan = ({ product, onSubmit }) => {
  const [coupan, setcoupan] = useState(0);
  const handleSubmit = () => {
    onSubmit(coupan);
  };

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
          <span>₹{product.totalCost}</span>
        </p>
        <p className="flex-center justify-between gap-2 lg:gap-10">
          <span>Shipping Charge: </span>
          <span>Calculated at the next step</span>
        </p>
        <hr className="border-black border-1" />
        <p className="flex-center justify-between">
          <span>Total</span>
          <span>₹{product.totalCost}</span>
        </p>
      </div>
      <Button
        color="default"
        variant="solid"
        size="large"
        htmlType="submit"
        className="w-full rounded-none"
        onClick={handleSubmit}
      >
        Continue to checkout
      </Button>
    </div>
  );
};

export default Coupan;

// const loadRazorpayScript = () => {
//   return new Promise((resolve) => {
//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.onload = () => resolve(true);
//     script.onerror = () => resolve(false);
//     document.body.appendChild(script);
//   });
// };
// const handlePayment = async () => {
//   const res = await loadRazorpayScript();
//   if (!res) {
//     alert("Razorpay SDK failed to load");
//     return;
//   }

//   const order = await axios.post(
//     `${process.env.REACT_APP_API}/api/order/create-order`,
//     {
//       totalPrice: product.totalCost,
//     },
//     { withCredentials: true }
//   );

//   const options = {
//     key: process.env.REACT_APP_RAZORPAY_ID, // Enter the Key ID generated from the Dashboard
//     amount: order.data.amount,
//     currency: order.data.currency,
//     name: "Your Store Name",
//     description: "Thank you for shopping with us",
//     image: "/logo.png", // Optional
//     order_id: order.data.id,
//     handler: async function (response) {
//       // Call a function to verify payment and update the database
//       const paymentData = {
//         order_id: response.razorpay_order_id,
//         payment_id: response.razorpay_payment_id,
//         signature: response.razorpay_signature,
//       };

//       const result = await axios.post(
//         `${process.env.REACT_APP_API}/api/payment/verify-payment`,
//         paymentData,
//         { withCredentials: true }
//       );
//       if (result.data.success) {
//         onPaymentSuccess();
//         message.success("Payment capture Successfully");
//       } else {
//         alert("Payment verification failed");
//       }
//     },
//     prefill: {
//       name: "Customer Name",
//       email: "customer@example.com",
//       contact: "9999999999",
//     },
//     theme: {
//       color: "#3399cc",
//     },
//   };

//   const paymentObject = new window.Razorpay(options);
//   paymentObject.open();
// };
