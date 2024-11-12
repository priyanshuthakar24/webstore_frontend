import { Divider, message } from "antd";
import axios from "axios";
import { Download } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OrderDetailpage = () => {
  const { id } = useParams();
  const [orderData, setorderData] = useState([]);
  const fetchOrderdetail = useCallback(async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/order/admin`,
        {
          params: { id },
        }
      );
      setorderData(res.data);
    } catch (error) {
      message.error(error);
    }
  }, [id]);
  useEffect(() => {
    fetchOrderdetail();
  }, [fetchOrderdetail]);
  return (
    <div className="my-20 mx-4  text-[#495057]">
      <h1 className="font-bold text-gray-700 mb-5">OrderDetail Page</h1>
      {/* {JSON.stringify(orderData)} */}
      <div className="shadow">
        <div className="bg-white  py-4  flex-center justify-between px-3">
          <span className="font-bold">Order # {orderData._id?.slice(-6)}</span>
          <span className="flex-center gap-2 bg-green-700 text-white p-2 text-sm rounded">
            <Download size={17} />
            Invoice
          </span>
        </div>

        {/* <div> */}
        <table className="border-1 w-full ">
          <thead>
            <tr className="px-2">
              <th className="text-start py-4 pl-4">Product Detail</th>
              <th className="text-start">Item Price</th>
              <th className="text-start">Quantity</th>
              <th className="text-start">TotalPrice</th>
            </tr>
          </thead>
          <tbody className="bg-white/90">
            {orderData.orderItems?.map((item) => (
              <tr>
                <td className="pl-3 py-5 w-1/3">
                  <div className="flex gap-5 h-[10vh]">
                    <img
                      src={item.product.mainImage.url}
                      alt=""
                      className="object-contain h-full rounded shadow"
                    />
                    <p className="lg:text-start text-xs lg:text-lg">
                      <p className="text-black font-sans">
                        {item.product.name}
                      </p>
                      <span>Size:{item.size}</span>
                    </p>
                  </div>
                </td>
                <td className="pl-5">₹ {item.product.salePrice}</td>
                <td className="pl-5">X {item.quantity}</td>
                <td className="pl-5">₹ {item.price}</td>
              </tr>
            ))}
            <tr>
              <td colSpan={4}>
                <Divider variant="dashed" className="w-full" />
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td className="space-y-0 lg:space-y-3 lg:text-start text-xs lg:text-lg">
                {/* <div> */}
                <p>SubTotal :</p>
                <p>Shipping Charge :</p>
                <p>Estimated Tax :</p>
                <Divider />
                <p className="font-bold">Total Price :</p>
                {/* </div> */}
              </td>
              <td className="space-y-2 lg:space-y-3 text-start text-xs lg:text-lg pt-3 lg:pt-0">
                <p>₹ {orderData.itemsPrice}.00</p>
                <p>₹ {orderData.shippingPrice}.00</p>
                <p>₹ {orderData.taxPrice}.00</p>
                <Divider className="hidden lg:flex" />
                <p className="font-bold">₹ {orderData.totalPrice}.00</p>
              </td>
            </tr>
            <tr>
              <td colSpan={4}>&nbsp;</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    // </div>
  );
};

export default OrderDetailpage;
