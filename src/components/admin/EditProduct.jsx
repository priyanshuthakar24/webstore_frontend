import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Popconfirm, Button, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import SingleProductView from "./SingleProductView";
import ProductForm from "./ProductFrom";
const EditProduct = () => {
  const { id } = useParams();
  const [productdetail, setProductDetail] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const nav = useNavigate();
  const fetchProductDetail = useCallback(async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/admin/productdetail`,
        { params: { id } }
      );
      setProductDetail(res.data);
    } catch (error) {
      console.error("Failed to fetch product details:", error);
    }
  }, [id]); // id is a dependency, so the function updates if `id` changes

  const handleUpdate = async (updatedProduct) => {
    try {
      // PUT request to update the product
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

      console.log(res.data.message);
      message.success(res.data.message);
      setIsEditing(false); // Exit edit mode after successful update
      fetchProductDetail(); // Refresh product data after update
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API}/api/admin/deleteproduct/${id}`
      );
      message.success(res.data.message);
      nav("/dashbord/products");
    } catch (error) {
      message.error(error.response.data.message);
    }
  };
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
                // type="primary"
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
                }} // Make the OK button
                larger
                cancelButtonProps={{ size: "middle", style: { width: 75 } }} // Make the
                style={{ width: "10rem" }}
              >
                <Button
                  variant="solid"
                  color="default"
                  size="large"
                  className="lg:w-80 mt-4 mx-5 text-lg  font-medium text-white deletebuttoninfo"
                  //   style={{ background: currentColor }}
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
