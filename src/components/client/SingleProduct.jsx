import { message, Rate } from "antd";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Dot } from "lucide-react";
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
          className="mt-20 text-black flex flex-col gap-5 lg:flex-row items-center justify-between mx-24"
        >
          <div className="w-1/2  h-[60vh]">
            <div>
              <img
                src={productDetail.mainImage && productDetail.mainImage.url}
                className="h-[60vh] w-full"
                alt="noimage"
              />
            </div>
          </div>
          {/* seconde div  */}
          <div className="space-y-4 w-1/2">
            <p className="font-bold text-3xl">{productDetail.name}</p>
            <p className="text-gray-700 ">{productDetail.description}</p>
            <div className="space-y-2">
              {productDetail.bulletPoints &&
                productDetail.bulletPoints.map((item) => (
                  <p className="flex-center">
                    <Dot size={25} />
                    {item}
                  </p>
                ))}
            </div>
            <p className="flex gap-3 items-center">
              <Rate disabled defaultValue={4} className="text-yellow-500" />
              <span>4</span>
            </p>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default SingleProduct;
