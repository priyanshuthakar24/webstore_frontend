import React, { useEffect } from "react";
import CartItem from "../components/client/CartItem";
import { useCartcontext } from "../context/Cartcontext";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import Checkout from "../components/client/checkout/Checkout";
const CartPage = () => {
  const { cart, fetchCart } = useCartcontext();
  useEffect(() => {
    fetchCart();
  }, []);

  if (!cart) return <p>Loading cart...</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-20 text-black "
    >
      <div className="grid  lg:grid-cols-2 place-items-center  ">
        <div>
          <div className="space-y-5 mb-5">
            <h1 className="text-4xl font-bold font-sans">Your Cart</h1>
            <p>
              Not ready to checkout ?{" "}
              <NavLink
                to="/shop"
                className="hover:underline hover:cursor-pointer"
              >
                Continue Shopping
              </NavLink>
            </p>
          </div>
          {cart.items?.length > 0 ? (
            <CartItem product={cart.items} />
          ) : (
            <p>Cart is Empty </p>
          )}
        </div>
        <div className=" flex lg:pt-20 items-start h-full mb-5 lg:mb-0">
          <Checkout cartItems={cart} />
          {/* <OrderSummary product={cart} /> */}
        </div>
      </div>
    </motion.div>
  );
};

export default CartPage;
