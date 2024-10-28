import { message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
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
    <div>
      {isLoading ? (
        <p>Loadding...</p>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid  grid-cols-2 mx-2 gap-4  lg:grid-cols-5 my-20 place-items-center xs:grid-cols-5 "
        >
          {productlist.length > 0 &&
            productlist.map((item) => (
              <Link to={`/singleproduct/${item._id}`}>
                <div className="w-[175px] lg:w-[264.03px] h-[50vh]  rounded-lg shadow-md hover:shadow-xl hover:outline-dotted  ">
                  <div className="w-[175px] lg:w-[264.03px] h-[35vh] bg-[#c4c4c4] relative rounded-lg">
                    <img
                      src={item.mainImage.url}
                      alt="nopic"
                      className="h-full object-fit rounded-lg"
                    />
                    <span className="bg-red-500 rounded-lg text-sm text-white px-3 py-1 font-bold absolute top-2 right-2">
                      17% OFF
                    </span>
                  </div>
                  <div className="pl-3">
                    <span className="text-sm lg:text-lg font-bold text-center text-gray-700 capitalize">
                      {item.name.slice(0, 20)}
                      {item.name.length > 23 ? "..." : ""}
                    </span>

                    <p className="space-x-4 text-right pr-3">
                      <span className="line-through text-gray-700 ">
                        ₹{item.mrp}.00
                      </span>
                      <span className="font-bold">₹{item.salePrice}.00</span>
                    </p>
                    <p className="text-gray-600 capitalize">
                      {item.description.slice(0, 35)}
                      {item.description.length > 40 ? "..." : ""}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
        </motion.div>
      )}
    </div>
  );
};

export default ProductList;
