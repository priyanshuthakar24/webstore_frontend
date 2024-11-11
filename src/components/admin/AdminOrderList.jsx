import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ColumnDirective,
  ColumnsDirective,
  ContextMenu,
  Filter,
  GridComponent,
  Inject,
  PagerComponent,
  Resize,
  Search,
  Sort,
  Toolbar,
} from "@syncfusion/ej2-react-grids";
import { message, Select } from "antd";
// import { Table, Select, message } from "antd";

const { Option } = Select;

function AdminOrderList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API}/api/order/admin/orders`
        );
        console.log(data);
        setOrders(data);
      } catch (error) {
        message.error("Error fetching orders");
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/order/admin/${orderId}/status`,
        {
          status: newStatus,
        }
      );
      setOrders(
        orders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
      message.success(data.message);
    } catch (error) {
      message.error("Error updating order status");
    }
  };

  // const columns = [
  //   { title: "Order ID", dataIndex: "_id", key: "_id" },
  //   {
  //     title: "Items",
  //     dataIndex: "orderItems",
  //     key: "orderItems",
  //     render: (items) => (
  //       <ul>
  //         {items.map((item, index) => (
  //           <li key={index}>
  //             {item.name} x {item.quantity}
  //           </li>
  //         ))}
  //       </ul>
  //     ),
  //   },
  //   {
  //     title: "Total Price",
  //     dataIndex: "totalPrice",
  //     key: "totalPrice",
  //     render: (price) => `₹${price}`,
  //   },
  //   {
  //     title: "Status",
  //     dataIndex: "status",
  //     key: "status",
  //     render: (status, order) => (
  //       <Select
  //         value={status}
  //         onChange={(newStatus) => handleStatusChange(order._id, newStatus)}
  //         style={{ width: 120 }}
  //       >
  //         <Option value="Pending">Pending</Option>
  //         <Option value="Confirmed">Confirmed</Option>
  //         <Option value="Shipped">Shipped</Option>
  //         <Option value="Delivered">Delivered</Option>
  //       </Select>
  //     ),
  //   },
  //   {
  //     title: "Created At",
  //     dataIndex: "createdAt",
  //     key: "createdAt",
  //     render: (date) => new Date(date).toLocaleString(),
  //   },
  // ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Manage Orders</h1>
      {/* <div className="md:m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
        <GridComponent
          id="gridcomp"
          dataSource={productdata}
          enableStickyHeader={true}
          allowSorting
          allowFiltering
          toolbar={toolbarOptions}
          rowSelected={handleRowClick}
        >
          <ColumnsDirective>
            {ordersGrid.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
          <Inject
            services={[Toolbar, Search, Resize, Sort, ContextMenu, Filter]}
          />
        </GridComponent>
        <PagerComponent
          totalRecordsCount={totalRecords}
          pageSize={10}
          currentPage={page}
          click={onPageChange}
        />
      </div> */}
      {/* <Table dataSource={orders} columns={columns} rowKey="_id" /> */}
    </div>
  );
}

export default AdminOrderList;
