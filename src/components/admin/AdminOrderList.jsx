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
import { message } from "antd";
import { ordersGrid } from "../../data/dummy";
import { useNavigate } from "react-router-dom";
// import { Table, Select, message } from "antd";

function AdminOrderList() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [loading, setisLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const fetchOrders = async (page = 1) => {
    setisLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/order/admin/orders`,
        {
          params: {
            page,
            limit: 20,
          },
        }
      );
      setOrders(data);
      setTotalRecords(data.totalCount);
      setisLoading(false);
    } catch (error) {
      message.error("Error fetching orders");
    }
  };
  const onPageChange = async (arg) => {
    fetchOrders(arg.currentPage);
  };
  useEffect(() => {
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
  const handleRowClick = async (arg) => {
    navigate(`/dashbord/orderlist/${arg.data.orderId}`);
  };
  const toolbarOptions = ["Search"];

  return (
    <div className="lg:mx-12 md:m-3 mt-12 p-2 md:p-5 bg-white rounded-3xl ">
      <div className="flex justify-center items-center mb-5  ">
        <h1 className="text-2xl font-bold text-center text-black">
          Order List
        </h1>
      </div>
      <div className="md:m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
        <GridComponent
          id="gridcomp"
          dataSource={orders}
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
          pageSize={20}
          currentPage={page}
          click={onPageChange}
        />
      </div>
    </div>
  );
}

export default AdminOrderList;
