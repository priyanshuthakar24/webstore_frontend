import React, { useEffect } from "react";
import CartItem from "../components/client/CartItem";
import OrderSummary from "../components/client/OrderSummary";
import { useCartcontext } from "../context/Cartcontext";

const CartPage = () => {
  const { cart, fetchCart } = useCartcontext();
  useEffect(() => {
    fetchCart();
  }, []);

  if (!cart) return <p>Loading cart...</p>;

  return (
    <div className="mt-20 text-black ">
      <div className="grid grid-rows-2 lg:grid-cols-2 place-items-center  ">
        <div>
          <div className="space-y-5 mb-5">
            <h1 className="text-4xl font-bold font-sans">Your Cart</h1>
            <p>
              Not ready to checkout ?{" "}
              <span className="hover:underline hover:cursor-pointer">
                Continue Shopping
              </span>
            </p>
          </div>
          {cart.items.length > 0 ? (
            <CartItem product={cart.items} />
          ) : (
            <p>Cart is Empty </p>
          )}
        </div>
        <div className="flex pt-20  items-start h-full mb-5 lg:mb-0">
          <OrderSummary product={cart} />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
