import { Button, Card, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import FormateDate from "../ui/FormateDate";
import { useNavigate } from "react-router-dom";

const NewOrderpage = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState([]);
  const fetchNewOrder = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/admin/order/neworder`
      );
      if (res) {
        setOrder(res.data.notification);
      }
    } catch (error) {
      message.error(error.response.data.message);
    }
  };
  const handleRemove = async (id) => {
    console.log(id);
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API}/api/admin/order/remove`,
        { params: { id } }
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
  }, []);

  const handleRowClick = async (value) => {
    navigate(`/dashbord/orderlist/${value}`);
  };
  return (
    <div className="mt-20 mx-5">
      {/* {JSON.stringify(order)} */}
      <h1 className="text-center mb-5 font-bold text-2xl text-gray-600">
        NewOrderpage
      </h1>
      <div className="space-y-2">
        {order.length > 0 ? (
          order.map((item) => (
            <Card>
              <div className="flex-center justify-between">
                <div>
                  <p
                    className="lg:text-base font-sans cursor-pointer"
                    onClick={() => handleRowClick(item.orderId)}
                  >
                    {item.message}
                  </p>
                  <p>
                    <FormateDate timestamp={item.date} />
                  </p>
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
