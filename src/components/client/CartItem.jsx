import React from "react";
import { useCartcontext } from "../../context/Cartcontext";

const CartItem = ({ product }) => {
  const { removeFromCart } = useCartcontext();
  return (
    <div className=" flex flex-col  gap-10">
      {/* {JSON.stringify(product)} */}
      {product.map((item) => (
        <>
          <div className="flex gap-5 " key={item.productId._id}>
            <div className="bg-[#c4c4c4]  w-[23vw] lg:w-[10vw] lg:h-[25vh]">
              <img
                src={item.productId.mainImage.url}
                alt="noimage"
                className="object-cover h-full w-full"
              />
            </div>
            <div className="w-[45vw] lg:w-[20vw] space-y-4">
              <p>{item.productId.name}</p>
              <p>L</p>
              <p>Quantity: {item.quantity}</p>
              <p>$ {item.productId.salePrice}</p>
            </div>
            <span className="underline flex items-end">
              <button
                type="button"
                onClick={() =>
                  removeFromCart(item.productId._id, item.quantity)
                }
              >
                Remove
              </button>
            </span>
          </div>
          <hr className="border-2 border-black/5 w-1/2" />
        </>
      ))}
    </div>
  );
};

export default CartItem;
