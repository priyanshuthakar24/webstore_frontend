import React from "react";

import { useCartcontext } from "../../context/Cartcontext";

const CartItem = ({ product }) => {
  const { removeFromCart } = useCartcontext();

  return (
    <div className=" flex flex-col lg:gap-10">
      {product?.map((item) => (
        <div key={item._id}>
          <div className="flex gap-5 ">
            <div className="bg-[#c4c4c4]  w-[23vw] lg:w-[10vw] lg:h-[25vh]">
              <img
                src={item.productId.mainImage.url}
                alt="noimage"
                className="object-cover h-full w-full"
              />
            </div>
            <div className="w-[45vw] lg:w-[20vw] space-y-4">
              <p>{item.productId.name}</p>
              <p>{item.size}</p>
              <p>Quantity: {item.quantity}</p>
              <p>₹ {item.productId.salePrice}</p>
            </div>
            <span className="underline flex items-end">
              <button
                type="button"
                onClick={() =>
                  removeFromCart(item.productId._id, item.quantity, item.size)
                }
              >
                Remove
              </button>
            </span>
          </div>
          <hr className="border-1 border-gray-700 my-5 lg:my-0 lg:border-black/5 w-full" />
        </div>
      ))}
    </div>
  );
};

export default CartItem;
