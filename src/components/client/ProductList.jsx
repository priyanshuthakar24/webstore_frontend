import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import FilterComponent from "../ui/FilterComponent";

import { message, Rate } from "antd";
import { AnimatePresence, motion } from "framer-motion";

const ProductList = () => {
  const [isLoading, setIsLoadinng] = useState(false);
  const [productlist, setProductList] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState({
    filter: null,
    sortOrder: null,
  });
  const [page, setPage] = useState(1); // Current page number
  const [hasMore, setHasMore] = useState(0); // Track if more products are available

  //  !Fetch the product list for the user
  const fetchProduct = async (page = 1) => {
    setIsLoadinng(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/user/shop`,
        {
          params: { page },
        }
      );
      if (res) {
        const newProducts = res.data.productlist;
        setProductList((prev) =>
          page === 1 ? newProducts : [...prev, ...newProducts]
        );
        // Check if more products are available
        setHasMore(res.data.totalCount);
      }
    } catch (error) {
      message.error(error.response.data.message);
    } finally {
      setIsLoadinng(false);
    }
  };

  //  calculate the discount precentage
  const discountprice = (mrp, salePrice) => {
    return Math.round(((mrp - salePrice) / mrp) * 100);
  };

  // Handle filtering and sorting criteria changes from FilterComponent
  const handleFilterChange = ({ filter, sortOrder }) => {
    setFilterCriteria({ filter, sortOrder });
  };

  // Apply filter and sort based on criteria
  const filteredAndSortedProducts = [...productlist]
    .filter((product) => {
      return filterCriteria.filter
        ? product.category === filterCriteria.filter
        : true;
    })
    .sort((a, b) => {
      if (filterCriteria.sortOrder === "New")
        return new Date(b.createdAt) - new Date(a.createdAt);
      if (filterCriteria.sortOrder === "Old")
        return new Date(a.createdAt) - new Date(b.createdAt);
      return 0; // No sorting for "Popular" or unspecified
    });

  // !calculate product length and gave the result
  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchProduct(nextPage);
  };

  useEffect(() => {
    fetchProduct(1);
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
              key={filterCriteria.filter || filterCriteria.sortOrder} // Re-render and animate when filter changes
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="grid  grid-cols-2 mx-2 lg:mx-20 gap-4  lg:grid-cols-4 my-10 place-items-center  "
            >
              {filteredAndSortedProducts.length > 0 ? (
                filteredAndSortedProducts.map((item) => (
                  <Link to={`/singleproduct/${item._id}`} key={item.name}>
                    <div className="w-[175px] lg:w-[264.03px] h-[52vh]  rounded  hover:shadow  ">
                      <div className=" px-0 w-[175px] lg:w-[264.03px] h-[30vh] bg-[#c4c4c4] relative rounded-lg">
                        <img
                          src={item.mainImage.url}
                          alt="nopic"
                          className="h-full w-full  rounded"
                        />
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
                        </span>

                        <p className="space-x-4 ">
                          <span className="line-through text-gray-700 ">
                            ₹{item.mrp}.00
                          </span>
                          <span className="lg:text-lg">
                            ₹{item.salePrice}.00
                          </span>
                        </p>
                        <Rate
                          disabled
                          allowHalf
                          defaultValue={item.averageRating}
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
          <motion.div
            whileHover={{ scale: 0.95 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center mb-5"
          >
            {page * 10 < hasMore && (
              <button
                type="button"
                className="border-1 border-black px-14 py-2 font-serif"
                onClick={handleLoadMore}
              >
                Load more Products
              </button>
            )}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ProductList;
