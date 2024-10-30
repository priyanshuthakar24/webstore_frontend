import React, { useEffect, useState } from "react";
import axios from "axios";

const CartPage = () => {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/api/cart`,
          {
            withCredentials: true,
          }
        );
        setCart(response.data);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, []);

  if (!cart) return <p>Loading cart...</p>;

  return (
    <div className="mt-20 text-black">
      <h1>Your Cart</h1>
      {cart.items.map((item) => (
        <div key={item.productId._id}>
          <p>{item.productId.name}</p>
          <p>Quantity: {item.quantity}</p>
          <p>Price: {item.price}</p>
        </div>
      ))}
      <h2>Total: {cart.totalCost}</h2>
    </div>
  );
};

export default CartPage;
