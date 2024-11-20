import React, { useState } from "react";
import { Modal, Form, Input, Select, message } from "antd";
import axios from "axios";
import { FilePenLine } from "lucide-react";
import { useParams } from "react-router-dom";

const { Option } = Select;

const OrderFormModal = ({ onOrderUpdate, logisticdata }) => {
  // State to manage modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { id } = useParams();

  // Form instance to manage form values and state
  const [form] = Form.useForm();

  // Show modal function
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Handle form submission
  const handleOk = async () => {
    try {
      console.log(id);
      // Validate the form fields
      const values = await form.validateFields();

      // Send data to the backend (replace '/api/orders' with your actual endpoint)
      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/order/admin/logisticsdetail`,
        values,
        { params: { id } }
      );

      // Assuming the backend returns the updated order data
      if (response.status === 200) {
        message.success("Order successfully created!");
        onOrderUpdate(response.data.data); // Update UI with new data
        setIsModalVisible(false); // Close the modal
        form.resetFields(); // Clear the form fields
      }
    } catch (error) {
      message.error("Failed to create order. Please try again.");
      console.error(error);
    }
  };

  // Handle modal cancellation
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <>
      {/* Button to open modal */}
      <span onClick={showModal} className="text-gray-600">
        <FilePenLine size={25} />
      </span>
      {/* </Button> */}

      {/* Modal with form inside */}
      <Modal
        title="Create Order"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Submit"
        cancelText="Cancel"
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            logisticsName: logisticdata?.logisticsName,
            trackId: logisticdata?.trackId,
            paymentType: logisticdata?.paymentType,
          }}
        >
          {/* Logistics Name Field */}
          <Form.Item
            label="Logistics Name"
            name="logisticsName"
            rules={[{ required: true, message: "Please enter logistics name" }]}
          >
            <Input placeholder="Enter logistics name" />
          </Form.Item>

          {/* Order ID Field */}
          <Form.Item
            label="Track ID"
            name="trackId"
            rules={[{ required: true, message: "Please enter order ID" }]}
          >
            <Input placeholder="Enter order ID" />
          </Form.Item>

          {/* Payment Type Field */}
          <Form.Item
            label="Payment Type"
            name="paymentType"
            rules={[{ required: true, message: "Please select payment type" }]}
          >
            <Select placeholder="Select payment type">
              <Option value="Credit Card">Credit Card</Option>
              <Option value="Debit Card">Debit Card</Option>
              <Option value="Cash on Delivery">Cash on Delivery</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default OrderFormModal;
