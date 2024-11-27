import React from "react";

import { useWishlist } from "../../context/Wishlist";

import { Heart } from "lucide-react";
import { FaHeart } from "react-icons/fa";

const Wishlistui = ({ product }) => {
  const { wishlistarray, addToWishlist, removeFromWishlist } = useWishlist();

  const isInWishlist = wishlistarray?.some(
    (item) => item.toString() === product
  );

  const handleWishlist = () => {
    if (isInWishlist) {
      removeFromWishlist(product);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <button
      className="px-4 py-3 rounded-lg hover:bg-black/5 "
      onClick={handleWishlist}
    >
      {isInWishlist ? <FaHeart color="red" size={30} /> : <Heart />}
    </button>
  );
};

export default Wishlistui;
