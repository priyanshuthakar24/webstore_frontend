import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import FormateDate from "../ui/FormateDate";

import { Button, Card, message } from "antd";

const NewOrderpage = () => {
  const navigate = useNavigate();

  const [order, setOrder] = useState([]);

  // //! fetch neworder from the backend
  const fetchNewOrder = useCallback(async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/admin/notification/neworder`,
        { withCredentials: true }
      );
      if (res) {
        setOrder(res.data.notification);
      }
    } catch (error) {
      message.error(error.response.data.message);
    }
  }, []);

  // //! remove the new order form the backend
  const handleRemove = async (id) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API}/api/admin/notification/remove`,
        { withCredentials: true, params: { id } }
      );
      if (res) {
        const newdata = order.filter((item) => item._id !== id);
        setOrder(newdata);
        message.success(res.data.message);
      }
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchNewOrder();
  }, [fetchNewOrder]);

  // //? onclike of the order message will nevigate to order detail page
  const handleRowClick = async (value) => {
    navigate(`/dashbord/orderlist/${value}`);
  };

  return (
    <div className="mt-20 mx-5">
      <h1 className="text-center mb-5 font-bold text-2xl text-gray-600">
        NewOrderpage
      </h1>
      <div className="space-y-2">
        {order.length > 0 ? (
          order.map((item, index) => (
            <Card key={index}>
              <div className="flex-center justify-between">
                <div>
                  <p
                    className="lg:text-base font-sans cursor-pointer"
                    onClick={() => handleRowClick(item.orderId)}
                  >
                    {item.message}
                  </p>
                  <div>
                    <FormateDate timestamp={item.date} />
                  </div>
                </div>
                <Button danger onClick={() => handleRemove(item._id)}>
                  Remove
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <p>No New Orders...</p>
        )}
      </div>
    </div>
  );
};

export default NewOrderpage;
