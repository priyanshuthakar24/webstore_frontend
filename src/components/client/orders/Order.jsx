// Example React component for Admin Panel

import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io.connect(`${process.env.REACT_APP_API}`); // Adjust to your server URL

function AdminPanel() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Listen for real-time order updates
    socket.on("orderUpdate", (data) => {
      alert(`New order update: ${data.message}`);
      setOrders((prevOrders) => [...prevOrders, data.order]);
    });

    // Clean up on component unmount
    return () => socket.off("orderUpdate");
  }, []);

  return (
    <div className="mt-20 text-black">
      <h1>Admin Panel - Orders</h1>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            Order #{order._id} - Status: {order.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPanel;
