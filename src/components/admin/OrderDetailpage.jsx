import { Avatar, Card, Divider, message, Select } from "antd";
import axios from "axios";
import { Download, Mail, MapPinned } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RiSecurePaymentLine } from "react-icons/ri";
import { PiTruckTrailerDuotone } from "react-icons/pi";
import { TbTruckDelivery } from "react-icons/tb";
import OrderFormModal from "../ui/OrderFormModal";
const OrderDetailpage = () => {
  const { id } = useParams();
  const [orderData, setorderData] = useState([]);
  const [loading, setLoading] = useState(false);
  const options = [
    { label: "Pending", value: "Pending" },
    { label: "Packed", value: "Packed" },
    { label: "Shipping", value: "Shipping" },
    { label: "Delivered", value: "Delivered" },
  ];
  const fetchOrderdetail = useCallback(async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  }, [id]);
  useEffect(() => {
    fetchOrderdetail();
  }, [fetchOrderdetail]);

  const handleStatusChange = async (value) => {
    // return console.log(value);
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/order/admin/${orderData._id}/status`,
        {
          status: value,
        }
      );
      message.success(data.message);
    } catch (error) {
      message.error("Error updating order status");
    }
  };
  return (
    <>
      {loading ? (
        <p>Loading ...</p>
      ) : (
        <div className="my-20 mx-4  text-[#495057]">
          <h1 className="font-bold text-gray-700 mb-5">OrderDetail Page</h1>
          {/* {JSON.stringify(orderData)} */}
          <div className="shadow">
            <div className="bg-white  py-4  flex-center justify-between px-3">
              <span className="font-bold">
                Order # {orderData._id?.slice(-6)}
              </span>
              <span className="flex gap-5 items-center">
                <OrderFormModal />

                <Select
                  onChange={handleStatusChange}
                  defaultValue={orderData.status}
                  options={options}
                  size="large"
                  className="w-full"
                  placeholder="Select Status"
                />
                <span className="flex-center gap-2 bg-green-700 text-white p-2 text-sm rounded">
                  <Download size={17} />
                  Invoice
                </span>
              </span>
            </div>

            {/* //! table  */}
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
                    <td className="pl-5">₹ {item.price}</td>
                    <td className="pl-5">X {item.quantity}</td>
                    <td>₹ {item.price * item.quantity}.00</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={4}>
                    <Divider variant="dashed" className="w-full" />
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td
                    className="space-y-3 text-center lg:text-lg lg:pl-20"
                    colSpan={2}
                  >
                    <p>SubTotal :</p>
                    <p>Shipping :</p>
                    <p> Tax :</p>
                    <Divider />
                    <p className="font-bold">Total Price :</p>
                  </td>
                  <td className="space-y-3 text-start lg:text-lg">
                    <p>₹ {orderData.itemsPrice}.00</p>
                    <p>₹ {orderData.shippingPrice}.00</p>
                    <p>₹ {orderData.taxPrice}.00</p>
                    <Divider />
                    <p className="font-bold">₹ {orderData.totalPrice}.00</p>
                  </td>
                </tr>
                <tr>
                  <td colSpan={4}>&nbsp;</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Section 2  */}

          <div className="flex mt-5 gap-10 flex-col lg:flex-row justify-center ">
            {/* //! customre Detail  */}
            <Card>
              <p className="font-bold  text-base font-sans text-gray-600 ">
                Customer Detail
              </p>
              <Divider className="my-4" />
              <div className="flex-center gap-5 ">
                <Avatar shape="square" size={45}>
                  {orderData.user?.name[0].toUpperCase()}
                </Avatar>
                <div>
                  <span className="text-lg capitalize">
                    {orderData.user?.name}
                  </span>
                  <p className="text-xs">Customer</p>
                </div>
              </div>
              <p className="flex-center gap-2 mt-5">
                <Mail size={20} />
                <span>{orderData.user?.email}</span>
              </p>
            </Card>
            {/* //! Shiipping Address  */}
            <Card>
              <p className="font-bold  text-base font-sans text-gray-600 flex gap-2 ">
                <MapPinned />
                <span>Shipping Address</span>
              </p>
              <Divider className="my-4" />
              <div className="space-y-1">
                <span className="text-lg capitalize">
                  {orderData.user?.name}
                </span>
                <p>{orderData.shippingInfo?.address}</p>
                <p>{orderData.shippingInfo?.city}</p>
                <p>{orderData.shippingInfo?.postalCode}</p>
                <p>{orderData.shippingInfo?.country}</p>
              </div>
            </Card>
            {/* //!payment Detail  */}
            <Card>
              <p className="font-bold  text-base font-sans text-gray-600 flex-center gap-2 ">
                <RiSecurePaymentLine size={25} />
                <span>Payment Details</span>
              </p>
              <Divider className="my-4" />
              <div className="space-y-1">
                <p className="text-base capitalize">
                  Transactions : #{orderData.paymentInfo?.id}
                </p>
                <p>
                  Payment Method:
                  {/* {orderData.shippingInfo.address} */}
                </p>
                <p>
                  Payment Holder Name:
                  {/* {orderData.shippingInfo.city} */}
                </p>
                <p>
                  <span>Card Number:</span>
                  <span>XXXX XXXX XXXX XXXX </span>
                  {/* {orderData.shippingInfo.postalCode} */}
                </p>
                <p className="text-black/75">
                  Total Amount: ₹ {orderData.totalPrice}.00
                </p>
              </div>
            </Card>
            {/* //! Logistic Detail  */}
            <Card>
              <p className="font-bold  text-base font-sans text-gray-600 flex-center gap-2 ">
                <TbTruckDelivery size={30} />
                <span>Logistics Details</span>
              </p>
              <Divider className="my-4" />
              <div className="space-y-1 text-center">
                <span className="flex-center justify-center">
                  <PiTruckTrailerDuotone size={35} />
                </span>
                <p className="text-lg">RQK Logistics</p>
                <p>ID: MFDS1400457854</p>
                <p>Payment Mode : Debit Card</p>
              </div>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderDetailpage;
