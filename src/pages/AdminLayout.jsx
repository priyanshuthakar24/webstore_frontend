import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/sidebar/Navbar";
import { useStateContext } from "../context/ContextProvider";

import { notification } from "antd";

import io from "socket.io-client";
const socket = io.connect(`${process.env.REACT_APP_API}`); // Your backend server URL

const AdminLayout = () => {
  const { activeMenu } = useStateContext();

  // Handle Notifications
  const openNotification = (orderId) => {
    notification.info({
      message: "New Order Notification",
      description: `A new order has been placed. Order ID: ${orderId}`,
      placement: "topRight",
      duration: 0,
    });
  };

  useEffect(() => {
    socket.on("orderUpdate", (data) => {
      // Extract the order ID and trigger a notification
      const orderId = data.result.orderId;
      openNotification(orderId);
    });

    return () => socket.off("orderUpdate"); // Cleanup on unmount
  }, []);

  return (
    <div className="flex relative">
      {/* //! sidebar  components  */}
      {activeMenu ? (
        <div className="w-72 fixed sidebar bg-black">
          <Sidebar />
        </div>
      ) : (
        <div className="w-0">SideBar</div>
      )}
      {/* //!navbar components  */}
      <div
        className={
          activeMenu
            ? "min-h-screen bg-[#EFF2F6] lg:ml-72 w-full"
            : "bg-[#EFF2F6] w-full min-h-screen flex-2"
        }
      >
        <div className="fixed md:static bg-black shadow-sm dark:bg-main-dark-bg navbar w-full">
          <Navbar className="navbarinfo" />
        </div>
        <div className="pt-10 text-black">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
