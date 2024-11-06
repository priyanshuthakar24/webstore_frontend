import React, { useEffect, useState } from "react";
import { Input, Button, Form } from "antd";

function AddressForm({ onSubmit, shippingInfo }) {
  //   const [addressData, setAddressData] = useState();
  const [form] = Form.useForm();

  const handleSubmit = (value) => {
    // setAddressData(value);
    onSubmit(value);
  };

  return (
    // <div className="space-y-5 mt-10">
      <Form form={form} onFinish={handleSubmit} initialValues={shippingInfo} className="w-full">
        <Form.Item
          name="address"
          rules={[
            { required: true, message: "Please input the product name!" },
          ]}
        >
          <Input name="address" placeholder="Address" size="large" />
        </Form.Item>
        <Form.Item
          name="city"
          rules={[{ required: true, message: "Please enter City Name" }]}
        >
          <Input
            name="city"
            placeholder="City"
            size="large"
            variant="filled"
            onChange={(e) => {
              const city =
                e.target.value.charAt(0).toUpperCase() +
                e.target.value.slice(1);
              form.setFieldsValue({ city: city });
            }}
          />
        </Form.Item>
        <Form.Item
          name="postalCode"
          rules={[{ required: true, message: "Please input the Postal code" }]}
        >
          <Input name="postalCode" placeholder="Postal Code" size="large" />
        </Form.Item>
        <Form.Item
          name="country"
          rules={[
            { required: true, message: "Please input the product name!" },
          ]}
        >
          <Input
            name="country"
            placeholder="Country"
            size="large"
            variant="filled"
            onChange={(e) => {
              const uppercase =
                e.target.value.charAt(0).toUpperCase() +
                e.target.value.slice(1);
              form.setFieldsValue({ country: uppercase });
            }}
          />
        </Form.Item>
        <Button
          className="w-full"
          size="large"
          color="default"
          variant="solid"
          htmlType="submit"
        >
          Next
        </Button>
      </Form>
    // </div>
  );
}

export default AddressForm;
