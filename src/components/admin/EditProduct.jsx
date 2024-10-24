import axios from "axios";
import React, { useEffect, useState } from "react";
import { Popconfirm, Button, message } from "antd";
import { useParams } from "react-router-dom";
import SingleProductView from "./SingleProductView";
const EditProduct = () => {
  const { id } = useParams();
  const [productdetail, setProductDetail] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const fetchproductdetail = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API}/api/admin/productdetail`,
      {
        params: { id },
      }
    );
    setProductDetail(res.data);
  };
  const confirm = (e) => {
    // handleDelete();
  };
  const cancel = (e) => {
    message.error("Cancel");
  };
  useEffect(() => {
    fetchproductdetail();
  }, []);
  return (
    <div className="mt-12 text-black">
      {productdetail && (
        <>
          {!isEditing ? (
            <div
              className="mx-5 mt-20 lg:mt-10 p-5 border 
rounded-lg shadow-md"
            >
              <SingleProductView props={productdetail} />
              <Button
                // type="primary"
                variant="solid"
                color="default"
                size="large"
                className="w-20 lg:w-80 mt-4 text-lg 
    font-medium editbuttoninfo"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </Button>
              <Popconfirm
                title="Delete the task"
                description="Are you sure to delete this 
    task?"
                onConfirm={confirm}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
                okButtonProps={{
                  size: "middle",
                  style: {
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
                  className="lg:w-80 mt-4 mx-5 text-lg 
    font-medium text-white 
    deletebuttoninfo"
                  //   style={{ background: currentColor }}
                >
                  Delete
                </Button>
              </Popconfirm>
            </div>
          ) : (
            <div>editForm</div>
          )}
        </>
      )}
    </div>
  );
};

export default EditProduct;
