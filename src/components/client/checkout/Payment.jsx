import React from "react";
import axios from "axios";
import { Button, message } from "antd";
// import CartItem from "../CartItem";

function Payment({ orderSummary, shippingInfo, cartItems, onPaymentSuccess }) {
  // Transform cart items to order items format
  const orderItems = cartItems.items.map((item) => ({
    product: item.productId._id, // Use the product ID only
    quantity: item.quantity,
    price: item.price,
    size: item.size,
  }));
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const isScriptLoaded = await loadRazorpayScript();
    if (!isScriptLoaded) {
      message.error("Failed to load Razorpay SDK");
      return;
    }

    // Create Razorpay order via backend
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/order/create-order`,
        {
          orderItems,
          shippingInfo,
          itemsPrice: orderSummary.itemsPrice,
          taxPrice: orderSummary.taxPrice,
          shippingPrice: orderSummary.shippingPrice,
          totalPrice: orderSummary.totalPrice,
        },
        { withCredentials: true }
      );

      const options = {
        key: process.env.REACT_APP_RAZORPAY_ID, // Replace with Razorpay key ID
        amount: data.order.totalPrice * 100, // Amount in paisa
        currency: "INR",
        name: "Ecommerce",
        description: "Order Payment",
        order_id: data.razorpayOrderId,
        handler: async function (response) {
          // Payment successful on frontend, display success message
          message.success(
            "Payment initiated successfully. Waiting for confirmation."
          );
          // Verify payment
          // const paymentData = {
          //   order_id: data.razorpayOrderId,
          //   payment_id: response.razorpay_payment_id,
          //   razorpay_signature: response.razorpay_signature,
          // };

          // const result = await axios.post(
          //   `${process.env.REACT_APP_API}/api/order/verify-payment`,
          //   paymentData,
          //   { withCredentials: true }
          // );

          // if (result.data.success) {
          //   message.success("Payment successful!");
          //   //   onPaymentSuccess(result.data.order);
          // } else {
          //   message.error("Payment verification failed");
          // }
        },
        prefill: {
          name: "Priyanshu Thakar",
          email: "myemail@example.com",
          contact: "7600195223",
        },
        theme: {
          color: "#cc3333",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  return (
    <div className="mt-4 space-y-4">
      <h2 className="font-sans text-lg">Complete Payment</h2>

      <Button
        type="primary"
        onClick={handlePayment}
        className="w-full"
        color="default"
        variant="solid"
        size="large"
      >
        Pay ₹{orderSummary.totalPrice}
      </Button>
    </div>
  );
}

export default Payment;
