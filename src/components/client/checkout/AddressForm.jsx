import React, { useEffect, useState } from "react";
import { Input, Button, Form, Select, InputNumber } from "antd";

function AddressForm({ onSubmit, shippingInfo }) {
  //   const [addressData, setAddressData] = useState();
  const [form] = Form.useForm();
  const Option = Select;
  const handleSubmit = (value) => {
    // setAddressData(value);
    onSubmit(value);
  };
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
        defaultValue={"+91"}
      >
        <Option value="86">+91</Option>
        {/* <Option value="87">+87</Option> */}
      </Select>
    </Form.Item>
  );
  return (
    // <div className="space-y-5 mt-10">
    <Form
      form={form}
      onFinish={handleSubmit}
      initialValues={shippingInfo}
      className="w-full"
    >
      <Form.Item
        name="phone"
        // label="Phone Number"
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
        rules={[{ required: true, message: "Please input the product name!" }]}
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
              e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
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
        rules={[{ required: true, message: "Please input the product name!" }]}
      >
        <Input
          name="country"
          placeholder="Country"
          size="large"
          variant="filled"
          onChange={(e) => {
            const uppercase =
              e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
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
