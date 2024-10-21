import React from "react";
import { ShoppingBag } from 'lucide-react';
const CartCount = (props) => {
  return (
    <div className="flex-center-between mr-6">
      <ShoppingBag className="m-2  size-5" />
      <span className="text-xl">{props.count}</span>
    </div>
  );
};

export default CartCount;
