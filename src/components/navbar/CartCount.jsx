import React, { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import axios from "axios";
const CartCount = (props) => {
  const [count, setcount] = useState(0);
  const fetchcartcount = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API}/api/cart`, {
      withCredentials: true,
    });

    cartquantity(res.data.items);
  };

  const cartquantity = (item) => {
    let quantity = 0;
    item.map((item) => (quantity += item.quantity));
    return setcount(quantity);
  };
  useEffect(() => {
    fetchcartcount();
  }, []);
  return (
    <div className="flex-center-between mr-6">
      <ShoppingBag className="m-2  size-5" />
      <span className="text-xl">{count}</span>
    </div>
  );
};

export default CartCount;
