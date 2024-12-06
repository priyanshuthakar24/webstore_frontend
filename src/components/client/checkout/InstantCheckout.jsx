import React, { useState } from "react";

import {
  Modal,
  Steps,
  Form,
  Input,
  Button,
  Divider,
  Select,
  InputNumber,
} from "antd";

const { Step } = Steps;

const InstantCheckout = ({
  visible,
  onClose,
  product,
  quantity,
  size,
  onPayment,
  isLoading,
}) => {
  const { Option } = Select;
  const [form] = Form.useForm();

  const [currentStep, setCurrentStep] = useState(0);
  const [shippingInfo, setShippingInfo] = useState({});

  const itemsPrice = product.salePrice * quantity;
  const tax = Math.round(product.salePrice * quantity * 0.18); // Example 18% tax
  const shippingCharge = 50; // Flat shipping charge
  const totalPrice = product.salePrice * quantity + tax + shippingCharge;

  const handleNext = async () => {
    if (currentStep === 0) {
      try {
        const values = await form.validateFields(); // Validate form fields
        setShippingInfo(values); // Save the valid shipping information
        setCurrentStep(1); // Move to the next step
      } catch (error) {
        // Validation failed; `error` contains information about the fields
        console.error("Validation Failed:", error);
      }
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const prefixSelector = (
    // <Form.Item name="prefix" noStyle>
    <Select
      style={{
        width: 70,
      }}
      defaultValue="+91"
      name="prefix"
    >
      <Option value="91">+91</Option>
    </Select>
    // </Form.Item>
  );

  const steps = [
    {
      title: "Enter Address",

      content: (
        <div>
          <Form form={form} layout="vertical">
            <Form.Item
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please input your phone number!",
                },
              ]}
            >
              <InputNumber
                addonBefore={prefixSelector}
                maxLength={10}
                minLength={10}
                style={{
                  width: "100%",
                }}
                size="large"
                placeholder="Please input your phone number!"
              />
            </Form.Item>
            <Form.Item
              name="address"
              rules={[{ required: true, message: "Please enter your address" }]}
            >
              <Input name="address" placeholder="Address" size="large" />
            </Form.Item>
            <Form.Item
              name="city"
              rules={[{ required: true, message: "Please enter your city" }]}
            >
              <Input
                variant="filled"
                name="city"
                placeholder="City"
                size="large"
                onChange={(e) => {
                  const city =
                    e.target.value.charAt(0).toUpperCase() +
                    e.target.value.slice(1);
                  form.setFieldsValue({ city: city });
                }}
              />
            </Form.Item>
            <Form.Item
              name="state"
              rules={[{ required: true, message: "Please enter your State" }]}
            >
              <Input
                name="state"
                placeholder="State"
                size="large"
                onChange={(e) => {
                  const state =
                    e.target.value.charAt(0).toUpperCase() +
                    e.target.value.slice(1);
                  form.setFieldsValue({ state: state });
                }}
              />
            </Form.Item>
            <Form.Item
              name="postalCode"
              rules={[
                { required: true, message: "Please enter your postal code" },
              ]}
            >
              <Input
                name="postalCode"
                placeholder="Postal Code"
                size="large"
                variant="filled"
              />
            </Form.Item>
            <Form.Item
              name="country"
              rules={[{ required: true, message: "Please enter your country" }]}
            >
              <Input
                name="country"
                placeholder="Country"
                size="large"
                onChange={(e) => {
                  const uppercase =
                    e.target.value.charAt(0).toUpperCase() +
                    e.target.value.slice(1);
                  form.setFieldsValue({ country: uppercase });
                }}
              />
            </Form.Item>
          </Form>
        </div>
      ),
    },
    {
      title: "Order Summary",
      content: (
        <div>
          <p>Product: {product.name}</p>
          <p>Quantity: {quantity}</p>
          <p>Size: {size}</p>
          <Divider />
          <p>Subtotal: ₹{product.salePrice * quantity}</p>
          <p>Tax (18%): ₹{tax}</p>
          <p>Shipping Charge: ₹{shippingCharge}</p>
          <Divider />
          <p>Total: ₹{totalPrice}</p>
        </div>
      ),
    },
    {
      title: "Make Payment",
      content: (
        <div className="space-y-2">
          <p>Click below to complete your payment:</p>
          <Button
            color="default"
            variant="solid"
            size="large"
            onClick={() =>
              onPayment({
                shippingInfo,
                totalPrice,
                tax,
                shippingCharge,
                itemsPrice,
              })
            }
            className="w-1/3"
            loading={isLoading}
          >
            Pay ₹{totalPrice}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Modal
      title="Checkout"
      open={visible}
      onCancel={onClose}
      footer={
        currentStep < steps.length - 1 ? (
          <Button
            variant="solid"
            color="default"
            size="large"
            onClick={handleNext}
            className="w-1/3"
          >
            {currentStep === 0 ? (
              "Next"
            ) : (
              <p className="text-xs lg:text-base"> Proceed to Pay</p>
            )}
          </Button>
        ) : null
      }
    >
      <Steps current={currentStep} className="custom-steps">
        {steps.map((step, index) => (
          <Step key={index} title={step.title} />
        ))}
      </Steps>
      <div className="mt-5">{steps[currentStep].content}</div>
    </Modal>
  );
};

export default InstantCheckout;
