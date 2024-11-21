import { Card, Divider } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/Authcontext";
import { useWishlist } from "../../context/Wishlist";
import CartCount from "../../components/ui/CartCount";
import { useCartcontext } from "../../context/Cartcontext";
import { Trash2 } from "lucide-react";

const Wishlist = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("L");
  const { wishlist, fetchWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCartcontext();
  useEffect(() => {
    fetchWishlist();
  }, []);
  const handleAddToCart = async (_id) => {
    setIsLoading(true);
    await addToCart(_id, quantity, size);
    setQuantity(1);
    setIsLoading(false);
  };
  const handleRemovewishlist = async (_id) => {
    removeFromWishlist(_id);
  };
  return (
    <div className="my-20 text-black mx-20">
      <h1 className="text-4xl font-sans mb-5 text-center">My Wishlist</h1>
      <div className="flex justify-center">
        <Card>
          <table className="space-y-5 w-full">
            <thead className="border-b-1 ">
              <th className="p-5 text-center">Product Name</th>
              <th className="p-5">Unit Price</th>
              <th className="p-5">Add To Cart</th>
              <th className="p-5">Remove</th>
            </thead>
            {wishlist.map((item) => (
              <tbody>
                <td className="flex items-center gap-10 my-5 ">
                  <div className="h-[20vh]">
                    <img src={item.mainImage.url} className="w-full h-full " />
                  </div>
                  <div className="w-1/2">
                    <p className="text-lg text-gray-800">{item.name}</p>
                  </div>
                </td>
                <td className="text-center">
                  <span className="text-xl font-bold">${item.salePrice}</span>
                </td>
                <td className="text-center">
                  {" "}
                  <button
                    disabled={isLoading}
                    onClick={() => handleAddToCart(item._id)}
                    className="hover:bg-black/5 px-4 py-3 rounded-lg font-sans"
                  >
                    Add To Cart
                  </button>
                </td>
                <td className="pl-8">
                  <button onClick={() => handleRemovewishlist(item._id)}>
                    <Trash2 />
                  </button>
                </td>
              </tbody>
            ))}
          </table>
        </Card>
      </div>
    </div>
  );
};

export default Wishlist;
