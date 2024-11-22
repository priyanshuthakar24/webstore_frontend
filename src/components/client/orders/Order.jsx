// Example React component for Admin Panel

import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { Button, Card, Divider } from "antd";
import axios from "axios";
import FormateDate from "../../ui/FormateDate";
import moment from "moment";
import Ordermodel from "./Ordermodel";
const socket = io.connect(`${process.env.REACT_APP_API}`); // Adjust to your server URL

function AdminPanel() {
  const [orders, setOrders] = useState([]);
  const fetchorders = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API}/api/order/userorder`,
      { withCredentials: true }
    );
    if (res) {
      setOrders(res.data);
    }
  };
  useEffect(() => {
    fetchorders();
    // Listen for real-time order updates
    // socket.on("orderUpdate", (data) => {
    // alert(`New order update: ${data.message}`);
    // setOrders((prevOrders) => [...prevOrders, data.order]);
    // });
    // Clean up on component unmount
    // return () => socket.off("orderUpdate");
  }, []);

  return (
    <div className="my-20 text-[#495057] lg:mx-20 mx-4">
      <h1 className="text-4xl font-sans m-6">Your Order</h1>
      {/* {JSON.stringify(orders)} */}
      <div className="space-y-10">
        {orders.length > 0 ? (
          orders?.map((item) => (
            <Card>
              {/* shipping information  */}
              <div className="flex-center justify-evenly lg:text-lg gap-2 flex-wrap">
                <div>
                  <p className="lg:text-lg font-sans text-black/35">Order Id</p>
                  <span>#{item._id.slice(-6)}</span>
                </div>
                <Divider type="vertical" className="border-1 h-[7vh] m-0 " />
                <p className="text-center">
                  <p className="lg:text-lg font-sans text-black/35">
                    Order Date
                  </p>
                  <span>{moment(item.paitAt).format(" MMM DD, YYYY")}</span>
                </p>
                <Divider type="vertical" className="border-1 h-[7vh] m-0 " />
                <p className="text-center">
                  <p className="lg:text-lg font-sans text-black/35">
                    Delivery Status
                  </p>
                  <span className="text-center">{item.status}</span>
                </p>
                <Divider
                  type="vertical"
                  className="border-0 lg:border-1 h-[4vh] m-0 "
                />
                <p className="text-center">
                  <p className="lg:text-lg font-sans text-black/35">
                    Delivery Date
                  </p>
                  <span className="text-xs lg:text-base">
                    {item?.deliveredAt &&
                      moment(item.deliveredAt).format("MMM DD, YYYY, h:mm A")}
                  </span>
                </p>
                <Divider type="vertical" className="border-1 h-[7vh] m-0 " />
                <p className="text-center lg:text-lg">
                  <p className=" font-sans text-black/35">Ship To</p>
                  <span className="text-xs lg:text-base">
                    {item.shippingInfo.address},{item.shippingInfo.city}
                  </span>
                </p>
              </div>
              <Divider className="border-1" />
              {/* cart item list  */}
              <div className="space-y-5">
                {item.orderItems?.map((iteminfo) => (
                  <div className="flex gap-5 lg:gap-10">
                    <div className="lg:h-[20vh] lg:w-[8vw] h-[13vh] w-[25vw]">
                      <img
                        src={iteminfo.product.mainImage?.url}
                        className="h-full w-full rounded"
                      />
                    </div>
                    <div className="flex justify-between w-full">
                      <div className="lg:space-y-3">
                        <p className="lg:text-lg font-sans">
                          {iteminfo.product.name}
                        </p>
                        <p>
                          <span className="text-gray-600 text-base">
                            Size :{" "}
                          </span>
                          {iteminfo.size}
                        </p>
                        <p>
                          <span className="text-gray-600 text-base">
                            Quantity :{" "}
                          </span>
                          {iteminfo.quantity}
                        </p>
                      </div>
                      <div className=" lg:text-xl font-bold font-sans">
                        <span>₹{iteminfo.price * iteminfo.quantity}.00</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Divider className="border-1" />
              {/* total Amount  */}
              <div className="flex-center justify-between flex-col lg:flex-row gap-3">
                <p className="text-center">
                  <span className="font-sans text-lg text-black/35">
                    Total Amount :
                  </span>
                  <span className="text-xl font-sans font-bold">
                    {" "}
                    ₹ {item.totalPrice}.00
                  </span>
                </p>
                <Ordermodel orderdata={item} />
              </div>
            </Card>
          ))
        ) : (
          <p>No Previous Order Found!</p>
        )}
      </div>
    </div>
  );
}

export default AdminPanel;
