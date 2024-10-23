import React from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space } from "antd";
const onFinish = (values) => {
  console.log("Received values of form:", values);
};
const App = () => (
  <div className="mt-12 max-w-2xl mx-auto lg:mb-10 p-5 bg-white rounded-lg shadow-lg">
    <Form
      name="dynamic_form_nest_item"
      layout="vertical"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
      }}
      autoComplete="off"
    >
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  </div>
);
export default App;
