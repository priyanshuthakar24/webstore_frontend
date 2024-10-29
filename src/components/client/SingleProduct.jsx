import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { message } from "antd";
import SingleProductView from "./SingleProductView";
const SingleProduct = () => {
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState([]);
  const [isLoading, setIsLoadinng] = useState(false);
  const fetchproductdetail = useCallback(async () => {
    setIsLoadinng(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/admin/productdetail`,
        {
          params: { id },
        }
      );
      setProductDetail(res.data);
    } catch (error) {
      message.error(error.response.data.message);
    } finally {
      setIsLoadinng(false);
    }
  }, [id]);

  useEffect(() => {
    fetchproductdetail();
  }, [fetchproductdetail]);
  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-20 mx-5 text-black flex flex-col gap-5 lg:flex-row items-center lg:justify-between lg:mx-24"
        >
          <div></div>
          <SingleProductView props={productDetail} />
        </motion.div>
      )}
    </>
  );
};

export default SingleProduct;
