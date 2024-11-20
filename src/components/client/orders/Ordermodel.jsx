import { Button, Card, Divider, Modal } from "antd";
import React, { useState } from "react";
import { CheckCircleTwoTone } from "@ant-design/icons";
const Ordermodel = ({ orderdata }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button
        color="default"
        variant="solid"
        size="large"
        className="w-full lg:w-auto"
        onClick={showModal}
      >
        View Invoice
      </Button>
      <Modal
        title="Order Invoice"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer=""
      >
        <div>
          {/* {JSON.stringify(orderdata)} */}
          <Card className="mt-2">
            <CheckCircleTwoTone twoToneColor="#52c41a" size={30} />
            <p>{orderdata.paymentInfo.id}</p>
          </Card>
          {orderdata.orderItems?.map((item) => (
            <p className="flex-center justify-between">
              <p className="text-xs lg:text-base text-wrap">
                {item.product.name}
              </p>
              <p>X {item.quantity}</p>
              <p>₹ {item.price * item.quantity}.00</p>
            </p>
          ))}
          <Divider />
          <p className="grid  grid-cols-2 gap-2">
            <Card>
              <span>ItemPrice : </span>
              <span>₹{orderdata.itemsPrice}.00</span>
            </Card>
            <Card>
              <span>TaxPrice : </span>
              <span>₹{orderdata.taxPrice}.00</span>
            </Card>
            <Card>
              <span>Shipping : </span>
              <span>₹{orderdata.shippingPrice}.00</span>
            </Card>
            <Card>
              <span className="font-sans font-bold">TotalPrice : </span>
              <span className="font-bold">₹{orderdata.totalPrice}.00</span>
            </Card>
          </p>
        </div>
      </Modal>
    </>
  );
};

export default Ordermodel;
