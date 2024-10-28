import { message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Scale } from "lucide-react";
const ProductList = () => {
  const [isLoading, setIsLoadinng] = useState(false);
  const [productlist, setProductList] = useState([]);
  const fetchProduct = async () => {
    setIsLoadinng(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/admin/allproduct`
      );
      setProductList(res.data.productlist);
    } catch (error) {
      message.error(error.response.data.message);
    } finally {
      setIsLoadinng(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid lg:grid-cols-4 mt-20 place-items-center h-56">
        {productlist.length > 0 &&
          productlist.map((item) => (
            <div className="w-[264.03px] h-[340px]">
              <div className="w-[264.03px] h-[264.6px] bg-[#c4c4c4]"></div>
              <div>
                <span className="text-sm font-bold">₹{item.name}</span>
              </div>
              <p>${item.salePrice}</p>
            </div>
          ))}
      </div>

      {/* {isLoading ? <p>Loading...</p> : JSON.stringify(productlist)}  */}
    </motion.div>
  );
};

export default ProductList;
