import { Button, Card } from "antd";
import React, { useEffect, useState } from "react";
import { useWishlist } from "../../context/Wishlist";
import { useCartcontext } from "../../context/Cartcontext";
import { Trash2 } from "lucide-react";

const Wishlist = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("L");
  const { wishlist, setwishlist, fetchWishlist, removeFromWishlist } =
    useWishlist();
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
    <div className="my-20 text-black mx-0">
      <h1 className="text-4xl font-sans mb-5 text-center">My Wishlist</h1>
      <div className="flex justify-center">
        <Card>
          <table className="space-y-5 w-full">
            <thead className="border-b-1 lg:text-base text-xs ">
              <th className="lg:pb-5 text-center  ">Product Name</th>
              <th className="lg:pb-5 lg:px-5">Price</th>
              <th className="lg:pb-5 lg:px-5">Add To Cart</th>
              <th className="lg:pb-5 lg:px-5">Remove</th>
            </thead>
            {wishlist.lenght > 0 ? (
              wishlist.map((item) => (
                <tbody>
                  <td className="flex items-center gap-3 lg:gap-10 my-5 ">
                    <div className="lg:h-[20vh] w-[20vw]  lg:w-auto">
                      <img
                        src={item.mainImage.url}
                        className="w-full h-full "
                      />
                    </div>
                    <div className="w-full lg:w-1/2">
                      <p className="lg:text-lg text-gray-800 text-xs">
                        {item.name}
                      </p>
                    </div>
                  </td>
                  <td className="text-center">
                    <span className="lg:text-xl lg:font-bold">
                      ₹{item.salePrice}.00
                    </span>
                  </td>
                  <td className="lg:px-8">
                    <Button
                      color="default"
                      variant="solid"
                      disabled={isLoading}
                      onClick={() => handleAddToCart(item._id)}
                      size="lg:large"
                      className="ml-4 lg:ml-0 lg:hidden "
                    >
                      Buy
                    </Button>
                    <div className="hidden lg:flex">
                      <Button
                        color="default"
                        variant="solid"
                        disabled={isLoading}
                        onClick={() => handleAddToCart(item._id)}
                        size="lg:large"
                        className="ml-4 lg:ml-0"
                      >
                        Add To Cart
                      </Button>
                    </div>
                  </td>

                  <td className="pl-8">
                    <button onClick={() => handleRemovewishlist(item._id)}>
                      <Trash2 />
                    </button>
                  </td>
                </tbody>
              ))
            ) : (
              <p>No Product Found</p>
            )}
          </table>
        </Card>
      </div>
    </div>
  );
};

export default Wishlist;
