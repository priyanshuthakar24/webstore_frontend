import axios from "axios";
import React from "react";
import ProductForm from "./ProductFrom";
import { message } from "antd";

const AddProduct = () => {
  const handlesubmit = async (AddProduct) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/admin/addproduct`,
        AddProduct,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res) {
        message.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error(error.response.data.message);
    }
  };
  return (
    <div>
      <ProductForm onSubmit={handlesubmit} isEditMode={false} />
    </div>
  );
};

export default AddProduct;
