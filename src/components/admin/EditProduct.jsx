import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import SingleProductView from "./SingleProductView";
import ProductForm from "./ProductFrom";

import { Popconfirm, Button, message } from "antd";

const EditProduct = () => {
  const { id } = useParams();
  const nav = useNavigate();

  const [productdetail, setProductDetail] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  // //! Fetch the single product detail
  const fetchProductDetail = useCallback(async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/admin/productdetail`,
        { withCredentials: true, params: { id } }
      );
      if (res) {
        setProductDetail(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch product details:", error);
      message.error(error.response.data.message);
    }
  }, [id]); // id is a dependency, so the function updates if `id` changes

  // //! update product detail and again fetch data
  const handleUpdate = async (updatedProduct) => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API}/api/admin/products/${id}`, // Assuming you're passing product ID as param
        updatedProduct,
        { withCredentials: true },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res) {
        message.success(res.data.message);
        setIsEditing(false); // Exit edit mode after successful update
        fetchProductDetail(); // Refresh product data after update
      }
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  // //! delete the product function
  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API}/api/admin/deleteproduct/${id}`,
        { withCredentials: true }
      );
      if (res) {
        message.success(res.data.message);
        nav("/dashbord/products");
      }
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  //  //! delele button popup two option
  const confirm = (e) => {
    handleDelete();
  };
  const cancel = (e) => {
    message.error("Cancel");
  };

  useEffect(() => {
    fetchProductDetail();
  }, [fetchProductDetail]);

  return (
    <div className="mt-12 text-black">
      {productdetail && (
        <>
          {!isEditing ? (
            <div className="mx-5 mt-10  p-5 border rounded-lg shadow-md">
              <SingleProductView props={productdetail} />
              <Button
                variant="solid"
                color="default"
                size="large"
                className="w-20 lg:w-80 mt-4 text-lg font-medium editbuttoninfo"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </Button>
              <Popconfirm
                title="Delete the task"
                description="Are you sure to delete this  task?"
                onConfirm={confirm}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
                okButtonProps={{
                  size: "middle",
                  style: {
                    background: "black",
                    width: 75,
                  },
                }}
                larger
                cancelButtonProps={{ size: "middle", style: { width: 75 } }}
                style={{ width: "10rem" }}
              >
                <Button
                  variant="solid"
                  color="default"
                  size="large"
                  className="lg:w-80 mt-4 mx-5 text-lg  font-medium text-white deletebuttoninfo"
                >
                  Delete
                </Button>
              </Popconfirm>
            </div>
          ) : (
            <div>
              <ProductForm
                initialValues={productdetail}
                isEditMode={true}
                onSubmit={handleUpdate}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EditProduct;
