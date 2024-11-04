import { message, Rate } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import FilterComponent from "../ui/FilterComponent";
const ProductList = () => {
  const [isLoading, setIsLoadinng] = useState(false);
  const [productlist, setProductList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
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
  const discountprice = (mrp, salePrice) => {
    return Math.round(((mrp - salePrice) / mrp) * 100);
  };

  // Handle filter change from FilterComponent
  const handleFilterChange = (filter) => {
    setSelectedCategory(filter);
  };

  // Filter products based on selected category
  const filteredProducts = selectedCategory
    ? productlist.filter((product) => product.category === selectedCategory)
    : productlist;

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
        >
          <div className="bg-black text-white border-t-1 border-white space-y-4 p-10 pl-24 hidden lg:flex flex-col">
            <p className="text-5xl font-sans">Shop Men’s</p>
            <p>
              Revamp your style with the latest designer trends in men’s
              <br />
              clothing or achieve a perfectly curated wardrobe thanks to <br />
              our line-up of timeless pieces.{" "}
            </p>
          </div>

          <FilterComponent onFilterChange={handleFilterChange} />
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory} // Re-render and animate when filter changes
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="grid  grid-cols-2 mx-2 gap-4  lg:grid-cols-5 my-10 place-items-center xs:grid-cols-5 "
            >
              {filteredProducts.length > 0 ? (
                filteredProducts.map((item) => (
                  <Link to={`/singleproduct/${item._id}`} key={item.name}>
                    <div className="w-[175px] lg:w-[264.03px] h-[52vh]  rounded  hover:shadow  ">
                      <div className=" px-0 w-[175px] lg:w-[264.03px] h-[35vh] bg-[#c4c4c4] relative rounded-lg">
                        {/* <img
                      src={item.mainImage.url}
                      alt="nopic"
                      className="h-full object-cover rounded"
                    /> */}
                        <span className="bg-red-500 rounded-lg text-sm text-white px-3 py-1 font-bold absolute top-2 right-2">
                          {discountprice(item.mrp, item.salePrice)}% OFF
                        </span>
                      </div>
                      <div className=" mt-2 px-3">
                        <span className=" text-lg font-bold text-center text-gray-700 capitalize hidden lg:flex">
                          {item.name.slice(0, 23)}
                          {item.name.length > 23 ? "..." : ""}
                        </span>
                        <span className="text-sm  text-center text-gray-700 capitalize lg:hidden">
                          {item.name.slice(0, 20)}
                          {/* {item.name.length > 23 ? "..." : ""} */}
                        </span>

                        <p className="space-x-4 ">
                          <span className="line-through text-gray-700 ">
                            ₹{item.mrp}.00
                          </span>
                          <span className="lg:text-lg">
                            ₹ {item.salePrice}.00
                          </span>
                        </p>
                        <Rate
                          disabled
                          defaultValue={4}
                          className="text-yellow-500 text-sm"
                        />

                        <p className="text-gray-600 capitalize hidden lg:flex">
                          {item.description.slice(0, 52)}
                          {item.description.length > 40 ? "..." : ""}
                        </p>
                        <p className="text-gray-600 capitalize flex lg:hidden">
                          {item.description.slice(0, 32)}
                          {item.description.length > 40 ? "..." : ""}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p>No products found for this category.</p>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};

export default ProductList;
