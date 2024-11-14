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
import io from "socket.io-client";
const socket = io.connect(`${process.env.REACT_APP_API}`); // Adjust to your server URL

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
    setPage(arg.currentPage);
    fetchOrders(arg.currentPage);
  };
  useEffect(() => {
    fetchOrders();

    // Listen for real-time order updates
    socket.on("orderUpdate", (data) => {
      console.log("Received order update:", data); // Log the received data

      if (data.allorder) {
        alert(`New order update: ${data.message}`);
        // Safely update orders by ensuring prevOrders is an array
        setOrders(data.allorder);
      }
    });

    // Clean up on component unmount
    return () => socket.off("orderUpdate");
  }, []);

  const handleRowClick = async (arg) => {
    navigate(`/dashbord/orderlist/${arg.data.orderId}`);
  };
  const toolbarOptions = ["Search"];

  return (
    <>
      {loading ? (
        <p> Loading...</p>
      ) : (
        <div className="lg:mx-12 md:m-3 mt-12 p-2 md:p-5 bg-white rounded-3xl ">
          <div className="flex justify-center items-center mb-5  ">
            <h1 className="text-2xl font-bold text-center text-black">
              Order List
            </h1>
          </div>
          <div className="md:m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
            <GridComponent
              id="gridcomp"
              dataSource={orders || []}
              enableStickyHeader={true}
              allowSorting={true}
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
      )}
    </>
  );
}

export default AdminOrderList;
