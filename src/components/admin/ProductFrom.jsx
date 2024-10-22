import React, { useState } from "react";
import { Button, Form, Input, Select, InputNumber, Flex } from "antd";
import TextArea from "antd/es/input/TextArea";
import { newcategory } from "../../data/dummy";
const ProductFrom = () => {
  const [isLoading, setisLoading] = useState(false);
  const [form] = Form.useForm();
  const handlesubmit = async (values) => {
    console.log(values);
  };
  return (
    <div className="mt-12 max-w-2xl mx-auto lg:mb-10 p-5 bg-white rounded-lg shadow-lg">
      {/* //! Page heading  */}
      <h2 className="text-2xl font-bold text-center mb-6">Product Form</h2>

      {/* //! add product Form  */}
      <Form form={form} onFinish={handlesubmit} layout="vertical" >
        <Form.Item
          label="Product Name"
          name="name"
          rules={[{ required: true, message: "Please input the name!" }]}
          required
        >
          <Input
            placeholder="Product Name"
            size="large"
            className="w-full p-2 border rounded"
          />
        </Form.Item>
        <Form.Item
          label="description"
          name="description"
          rules={[
            { required: true, message: "Please field Product Description" },
          ]}
        >
          <TextArea rows={5} placeholder="Product Description" />
        </Form.Item>
        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: "Please Select Category" }]}
        >
          <Select
            showSearch
            size="large"
            style={{
              width: "100%",
            }}
            placeholder="Search to Select"
            optionFilterProp="label"
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={newcategory}
          />
        </Form.Item>
        <Flex gap={10} flex={10}>
          <Form.Item
            label="MRP"
            name="mrp"
            rules={[{ required: true, message: "Sale Price Required" }]}
          >
            <InputNumber
              className="w-full"
              size="large"
              defaultValue={1000}
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value?.replace(/\$\s?|(,*)/g, "")}
            />
          </Form.Item>
          <Form.Item
            label="Stock"
            name="stock"
            rules={[{ required: true, message: "Please Select Quentity" }]}
          >
            <InputNumber
              variant="filled"
              size="large"
              defaultValue={5}
              className="w-full"
            />
          </Form.Item>
        </Flex>
        <Form.Item
          label="Sale Price"
          name="salep"
          rules={[{ required: true, message: "Sale Price Required" }]}
        >
          <InputNumber
            size="large"
            className="w-1/2"
            defaultValue={1000}
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value?.replace(/\$\s?|(,*)/g, "")}
          />
        </Form.Item>
        <Button
          size="large"
          color="default"
          variant="solid"
          className="w-full"
          htmlType="submit"
          loading={isLoading}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default ProductFrom;
