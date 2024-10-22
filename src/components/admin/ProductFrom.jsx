import { Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";

const ProductFrom = () => {
  const [form] = Form.useForm();
  const handlesubmit = async () => {};
  return (
    <div className="mt-12 max-w-2xl mx-auto lg:mb-10 p-5 bg-white rounded-lg shadow-lg">
      {/* //! Page heading  */}
      <h2 className="text-2xl font-bold text-center mb-6">Product Form</h2>

      {/* //! add product Form  */}
      <Form form={form} onFinish={handlesubmit} layout="vertical">
        <Form.Item
          label="Product Name"
          name="name"
          required={[{ required: true, message: "Please input the name!" }]}
        >
          <Input
            placeholder="Product Name"
            size="large"
            className="w-full p-2 border rounded"
          />
        </Form.Item>
        <Form.Item label="description" name="description">
          <TextArea rows={2} placeholder="Product Description" />
        </Form.Item>
        <Select></Select>
      </Form>
    </div>
  );
};

export default ProductFrom;
