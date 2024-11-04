import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import SingleProductView from "./SingleProductView";
import { useStateContext } from "../../context/ContextProvider";
const SingleProduct = () => {
  const { id } = useParams();
  const { fetchproductdetail, productDetail } = useStateContext();
  const [isLoading, setIsLoadinng] = useState(false);

  useEffect(() => {
    setIsLoadinng(true);
    fetchproductdetail(id);
    setIsLoadinng(false);
  }, []);
  return (
    <>
      {isLoading ? (
        <p className="mt-20 text-black">Loading...</p>
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
