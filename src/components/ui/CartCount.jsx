import React from "react";

import { Minus, Plus } from "lucide-react";

const CartCount = ({ onIncrement, onDecrement, value }) => {
  return (
    <div className="flex items-center space-x-8">
      <button
        onClick={onDecrement}
        type="button"
        className="hover:bg-black/5 px-3 py-2 rounded"
      >
        <Minus />
      </button>
      <span className="text-xl cursor-pointer">{value}</span>
      <button
        onClick={onIncrement}
        type="button"
        className="hover:bg-black/5 px-3 py-2 rounded"
      >
        <Plus />
      </button>
    </div>
  );
};

export default CartCount;
