import { Button, Card, Divider, Modal, Result } from "antd";
import React, { useState } from "react";
const Ordermodel = ({ orderdata }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
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
          <Result
            status="success"
            title=" Purchased Successfully!"
            subTitle={orderdata.paymentInfo.id}
          />
          {orderdata.orderItems?.map((item) => (
            <>
              <p className="grid grid-cols-3 gap-2">
                <p>{item.product.name}</p>
                <p className="text-end">X {item.quantity}</p>
                <p className="text-end">₹ {item.price * item.quantity}.00</p>
              </p>
              <Divider className="m-4" />
            </>
          ))}
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
