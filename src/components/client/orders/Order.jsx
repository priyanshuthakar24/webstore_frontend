// Example React component for Admin Panel
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";

import { useAuth } from "../../../context/Authcontext";
import Ordermodel from "./Ordermodel";

import { Card, Divider } from "antd";

function AdminPanel() {
  const { isAuthenticated } = useAuth();

  const [orders, setOrders] = useState([]);

  //  ! fet the order for the user
  const fetchorders = useCallback(async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API}/api/order/userorder`,
      { withCredentials: true }
    );
    if (res) {
      setOrders(res.data);
    }
  }, []);

  useEffect(() => {
    fetchorders();
  }, [fetchorders]);

  return (
    <div className="my-20 text-[#495057] lg:mx-20 mx-4">
      <h1 className="text-4xl font-sans m-6">Your Order</h1>
      <div className="space-y-10">
        {orders.length > 0 ? (
          orders?.map((item, index) => (
            <Card key={index}>
              {/* shipping information  */}
              <div className="flex-center justify-evenly lg:text-lg gap-2 flex-wrap">
                <div>
                  <p className="lg:text-lg font-sans text-black/35">Order Id</p>
                  <span>#{item._id.slice(-6)}</span>
                </div>
                <Divider type="vertical" className="border-1 h-[7vh] m-0 " />
                <div className="text-center">
                  <p className="lg:text-lg font-sans text-black/35">
                    Order Date
                  </p>
                  <span>{moment(item.paitAt).format(" MMM DD, YYYY")}</span>
                </div>
                <Divider type="vertical" className="border-1 h-[7vh] m-0 " />
                <div className="text-center">
                  <p className="lg:text-lg font-sans text-black/35">
                    Delivery Status
                  </p>
                  <span className="text-center">{item.status}</span>
                </div>
                <Divider
                  type="vertical"
                  className="border-0 lg:border-1 h-[4vh] m-0 "
                />
                <div className="text-center">
                  <p className="lg:text-lg font-sans text-black/35">
                    Delivery Date
                  </p>
                  <span className="text-xs lg:text-base">
                    {item?.deliveredAt &&
                      moment(item.deliveredAt).format("MMM DD, YYYY, h:mm A")}
                  </span>
                </div>
                <Divider type="vertical" className="border-1 h-[7vh] m-0 " />
                <div className="text-center lg:text-lg">
                  <p className=" font-sans text-black/35">Ship To</p>
                  <span className="text-xs lg:text-base">
                    {item.shippingInfo.address},{item.shippingInfo.city}
                  </span>
                </div>
              </div>
              <Divider className="border-1" key={item._id} />
              {/* cart item list  */}
              <div className="space-y-5">
                {item.orderItems?.map((iteminfo, index) => (
                  <div className="flex gap-5 lg:gap-10" key={index}>
                    <div className="lg:h-[20vh] lg:w-[8vw] h-[13vh] w-[25vw]">
                      <img
                        src={iteminfo.product.mainImage?.url}
                        className="h-full w-full rounded"
                        alt="no Product"
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
                        <p>
                          <Link
                            to={`/add-reviews/${iteminfo.product._id}`}
                            className="lg:text-xl text-xs hover:underline text-blue-500"
                          >
                            {isAuthenticated ? "Add Review" : ""}
                          </Link>
                        </p>
                      </div>
                      <div className=" lg:text-xl font-bold font-sans">
                        <span>₹{iteminfo.price * iteminfo.quantity}.00</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Divider className="border-1" key={index} />
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
