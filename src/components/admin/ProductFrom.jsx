import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Select,
  InputNumber,
  Space,
  Upload,
  Image,
  message,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { newcategory } from "../../data/dummy";

// Utility function to convert image to Base64
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const ProductForm = ({ initialValues, onSubmit, isEditMode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  // States for preview
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [mainImageList, setMainImageList] = useState([]);
  const [subImageList, setSubImageList] = useState([]);

  useEffect(() => {
    // Populate form with initial values when editing
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        bulletPoints: initialValues.bulletPoints?.map((bp) => ({
          bulletPoint: bp,
        })),
      });
      // Handle images separately if needed
      setMainImageList(
        initialValues.mainImage ? [{ url: initialValues.mainImage.url }] : []
      );
      setSubImageList(
        initialValues.subImages
          ? initialValues.subImages.map((url) => ({ url: url.url }))
          : []
      );
    }
  }, [initialValues, form]);

  // Preview Handler
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  // Image Upload Handlers
  const handleMainImageChange = ({ fileList: newFileList }) =>
    setMainImageList(newFileList);
  const handleSubImageChange = ({ fileList: newFileList }) =>
    setSubImageList(newFileList);

  // Custom value handler to extract the file list from event
  // const normFile = (e) => {
  //   if (Array.isArray(e)) {
  //     return e;
  //   }
  //   return e?.fileList;
  // };

  // Validation for minimum sub-images
  const validateSubImages = (_, value) => {
    if (subImageList.length < 3) {
      return Promise.reject(new Error("Please upload exactly 3 sub-images!"));
    }
    return Promise.resolve();
  };

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("category", values.category);
    formData.append("mrp", values.mrp);
    formData.append("salePrice", values.salePrice);
    formData.append("stock", values.stock);
    console.log(values);
    // Map bullet points to an array of strings
    const bulletPointsArray = values.bulletPoints.map(
      (item) => item.bulletPoint
    );
    formData.append("bulletPoints", JSON.stringify(bulletPointsArray));

    // Append main image
    if (mainImageList.length > 0) {
      console.log(mainImageList[0].originFileObj);
      formData.append(
        "mainImage",
        mainImageList[0].originFileObj || mainImageList[0].url
      );
    }

    // Append sub-images
    subImageList.forEach((file) => {
      formData.append("subImages", file.originFileObj || file.url);
    });

    setIsLoading(true);
    try {
      await onSubmit(formData); // Trigger the submission handler passed as prop
      // console.log(res.data.message);
      // message.success(res.data.message);
      form.resetFields();
      setMainImageList([]);
      setSubImageList([]);
    } catch (error) {
      message.error("Failed to submit the form.");
    } finally {
      setIsLoading(false);
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div className="mt-12 max-w-4xl mx-auto lg:mb-10 p-5 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Product Form</h2>

      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        initialValues={{
          bulletPoints: [{ bulletPoint: "" }], // Load one empty bullet point
        }}
      >
        {/* Product Name */}
        <Form.Item
          label="Product Name"
          name="name"
          rules={[
            { required: true, message: "Please input the product name!" },
          ]}
        >
          <Input
            placeholder="Product Name"
            size="large"
            className="w-full p-2 border rounded"
          />
        </Form.Item>
        {/* Product Description */}
        <Form.Item
          size="large"
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please input the product description!",
            },
          ]}
        >
          <TextArea rows={5} placeholder="Product Description" />
        </Form.Item>
        {/* Product Category */}
        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: "Please select a category!" }]}
        >
          <Select
            showSearch
            size="large"
            style={{ width: "100%" }}
            placeholder="Select a category"
            optionFilterProp="label"
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={newcategory}
          />
        </Form.Item>
        {/* MRP and Stock */}
        <div className="flex justify-between gap-6">
          <Form.Item
            label="MRP"
            name="mrp"
            rules={[{ required: true, message: "Please input the MRP!" }]}
            className="w-1/2"
          >
            <InputNumber
              className="w-full"
              size="large"
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value?.replace(/\$\s?|(,*)/g, "")}
            />
          </Form.Item>
          <Form.Item
            label="Stock"
            name="stock"
            rules={[
              { required: true, message: "Please input the stock quantity!" },
            ]}
            className="w-1/2"
          >
            <InputNumber className="w-full" size="large" min={1} />
          </Form.Item>
        </div>
        {/* Sale Price */}
        <Form.Item
          label="Sale Price"
          name="salePrice"
          rules={[{ required: true, message: "Please input the sale price!" }]}
        >
          <InputNumber
            size="large"
            className="w-full"
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value?.replace(/\$\s?|(,*)/g, "")}
          />
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
                    rules={[
                      {
                        required: true,
                        message: `Please input bullet point ${key + 1}!`,
                      },
                    ]}
                  >
                    <Input
                      placeholder={`Bullet Point ${key + 1}`}
                      size="large"
                    />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add Bullet Point
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        {/* Main Product Image Upload */}
        <Form.Item
          name="mainImage"
          label="Main Product Image"
          valuePropName="fileListss"
          // getValueFromEvent={normFile}
          rules={[
            {
              required: true,
              message: "Please upload the main product image!",
            },
          ]}
        >
          <Upload
            listType="picture-card"
            fileList={mainImageList}
            onPreview={handlePreview}
            onChange={handleMainImageChange}
            maxCount={1}
          >
            {mainImageList.length < 1 && uploadButton}
          </Upload>
        </Form.Item>

        {/* Sub Images Upload */}

        <Form.Item
          name="subImages"
          label="Sub Images (3 Images)"
          valuePropName="fileListccc"
          // getValueFromEvent={normFile}
          rules={[
            {
              required: true,
              validator: validateSubImages,
            },
          ]}
        >
          <Upload
            listType="picture-card"
            fileList={subImageList}
            onPreview={handlePreview}
            onChange={handleSubImageChange}
            multiple
            maxCount={3}
          >
            {subImageList.length < 3 && uploadButton}
          </Upload>
        </Form.Item>

        {/* Preview Modal */}
        {previewImage && (
          <Image
            wrapperStyle={{ display: "none" }}
            preview={{
              visible: previewOpen,
              onVisibleChange: (visible) => setPreviewOpen(visible),
              afterOpenChange: (visible) => !visible && setPreviewImage(""),
            }}
            src={previewImage}
          />
        )}
        {/* Submit Button */}
        <Form.Item>
          <Button
            color="default"
            variant="solid"
            size="large"
            htmlType="submit"
            className="w-full"
            loading={isLoading}
          >
            {isEditMode ? "Update" : "Submit"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductForm;
