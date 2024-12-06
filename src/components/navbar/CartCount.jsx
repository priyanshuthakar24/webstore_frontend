import React, { useCallback, useEffect } from "react";
import { ShoppingBag } from "lucide-react";
import axios from "axios";
import { useCartcontext } from "../../context/Cartcontext";
const CartCount = (props) => {
  const { cartcount, setcartcount } = useCartcontext();

  const cartquantity = useCallback(
    (item) => {
      let quantity = 0;
      item?.map((item) => (quantity += item.quantity));
      return setcartcount(quantity);
    },
    [setcartcount]
  );
  const fetchcartcount = useCallback(async () => {
    const res = await axios.get(`${process.env.REACT_APP_API}/api/cart`, {
      withCredentials: true,
    });
    if (res) {
      cartquantity(res.data.items);
    }
  }, [cartquantity]);

  useEffect(() => {
    fetchcartcount();
  }, [fetchcartcount]);
  return (
    <div className="flex-center-between mr-6">
      <ShoppingBag className="m-2  size-5" />
      <span className="text-xl">{cartcount}</span>
    </div>
  );
};

export default CartCount;
