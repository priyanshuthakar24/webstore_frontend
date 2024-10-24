// src/components/ProductForm.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Select,
  Upload,
  Space,
  Image,
  message,
} from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { newcategory } from "../../data/dummy";

// Utility to convert image to Base64
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const EditProductform = ({ initialValues, isEditing, onSubmit }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  const [mainImageList, setMainImageList] = useState([]);
  const [subImageList, setSubImageList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  // Populate the form and image lists when editing
  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
      if (initialValues.mainImage) {
        setMainImageList([{ url: initialValues.mainImage }]);
      }
      if (initialValues.subImages) {
        setSubImageList(initialValues.subImages.map((url) => ({ url })));
      }
    }
  }, [initialValues, form]);

  // Handle Image Preview
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  // Handle Main Image Change
  const handleMainImageChange = ({ fileList }) => {
    setMainImageList(fileList);
  };

  // Handle Sub Images Change
  const handleSubImageChange = ({ fileList }) => {
    setSubImageList(fileList);
  };

  // Submit Form (Either Create or Edit)
  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("category", values.category);
    formData.append("mrp", values.mrp);
    formData.append("salePrice", values.salePrice);
    formData.append("stock", values.stock);

    // Bullet Points
    const bulletPointsArray = values.bulletPoints.map(
      (item) => item.bulletPoint
    );
    formData.append("bulletPoints", JSON.stringify(bulletPointsArray));

    // Main Image
    if (mainImageList.length > 0 && mainImageList[0].originFileObj) {
      formData.append("mainImage", mainImageList[0].originFileObj);
    }

    // Sub Images
    subImageList.forEach((file) => {
      if (file.originFileObj) {
        formData.append("subImages", file.originFileObj);
      }
    });

    setIsLoading(true);
    try {
      await onSubmit(formData);
      message.success(
        isEditing
          ? "Product updated successfully!"
          : "Product added successfully!"
      );
      form.resetFields();
      setMainImageList([]);
      setSubImageList([]);
    } catch (error) {
      message.error("Failed to save product.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      layout="vertical"
      initialValues={initialValues}
    >
      {/* Product Name */}
      <Form.Item
        label="Product Name"
        name="name"
        rules={[{ required: true, message: "Please enter product name!" }]}
      >
        <Input placeholder="Product Name" />
      </Form.Item>

      {/* Description */}
      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: "Please enter description!" }]}
      >
        <TextArea rows={4} placeholder="Product Description" />
      </Form.Item>

      {/* Category */}
      <Form.Item
        label="Category"
        name="category"
        rules={[{ required: true, message: "Please select a category!" }]}
      >
        <Select placeholder="Select Category" options={newcategory} />
      </Form.Item>

      {/* MRP & Stock */}
      <div className="flex gap-4">
        <Form.Item
          label="MRP"
          name="mrp"
          rules={[{ required: true, message: "Please enter MRP!" }]}
        >
          <InputNumber prefix="$" style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="Stock"
          name="stock"
          rules={[{ required: true, message: "Please enter stock quantity!" }]}
        >
          <InputNumber min={1} style={{ width: "100%" }} />
        </Form.Item>
      </div>

      {/* Sale Price */}
      <Form.Item
        label="Sale Price"
        name="salePrice"
        rules={[{ required: true, message: "Please enter sale price!" }]}
      >
        <InputNumber prefix="$" style={{ width: "100%" }} />
      </Form.Item>

      {/* Bullet Points */}
      <Form.List name="bulletPoints">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{ display: "flex", marginBottom: 8 }}
                align="baseline"
              >
                <Form.Item
                  {...restField}
                  name={[name, "bulletPoint"]}
                  rules={[{ required: true, message: "Enter bullet point!" }]}
                >
                  <Input placeholder={`Bullet Point ${key + 1}`} />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Button type="dashed" onClick={() => add()} block>
              <PlusOutlined /> Add Bullet Point
            </Button>
          </>
        )}
      </Form.List>

      {/* Main Image */}
      <Form.Item label="Main Product Image">
        <Upload
          listType="picture-card"
          fileList={mainImageList}
          onPreview={handlePreview}
          onChange={handleMainImageChange}
          maxCount={1}
        >
          {mainImageList.length < 1 && (
            <div>
              <PlusOutlined />
              <div>Upload</div>
            </div>
          )}
        </Upload>
      </Form.Item>

      {/* Sub Images */}
      <Form.Item label="Sub Images (Max 3)">
        <Upload
          listType="picture-card"
          fileList={subImageList}
          onPreview={handlePreview}
          onChange={handleSubImageChange}
          multiple
          maxCount={3}
        >
          {subImageList.length < 3 && (
            <div>
              <PlusOutlined />
              <div>Upload</div>
            </div>
          )}
        </Upload>
      </Form.Item>

      {/* Submit Button */}
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading} block>
          {isEditing ? "Update Product" : "Add Product"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditProductform;

