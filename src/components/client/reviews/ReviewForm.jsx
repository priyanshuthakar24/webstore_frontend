import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

import { useAuth } from "../../../context/Authcontext";

import { Rate, Button, Input, Form, notification, Card } from "antd";

const { TextArea } = Input;

const ReviewForm = () => {
  const [form] = Form.useForm();

  const { id } = useParams();

  const { userData } = useAuth();

  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);

  // ! fech the user review if the user have already filled it
  const fetchreviews = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API}/api/review`, {
      withCredentials: true,
      params: {
        productId: id,
      },
    });
    if (res) {
      setProduct(res.data);
    }
  };

  // ! submit the review and show the notification
  const handleSubmit = async (values) => {
    const { rating, comment } = values;
    setLoading(true);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/review/add`,
        { rating, comment, name: userData.name },
        { withCredentials: true, params: { productId: id } }
      );
      if (res) {
        notification.success({
          message: "Review Added",
          description:
            product.reviews?.length > 0
              ? "Your review has been updated!"
              : "Your review has been added!",
        });

        form.resetFields();
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description: error.response?.data?.message || "Failed to add review.",
      });
    } finally {
      setLoading(false);
    }
  };

  // ?will fetch the review
  useEffect(() => {
    fetchreviews();
  }, []);

  // !Prefill the form with user's existing review
  useEffect(() => {
    if (product.reviews?.length > 0) {
      form.setFieldsValue({
        rating: product?.reviews[0]?.rating,
        comment: product?.reviews[0]?.comment,
      });
    }
  }, [product.reviews, form]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-4 lg:mx-20 mt-24 min-h-[70vh] "
    >
      <Card>
        <h2 className="text-4xl text-black text-center font-sans mb-4">
          {product.reviews?.length > 0 ? "Update Your Review" : "Add a Review"}
        </h2>
        <div className="lg:px-8">
          <div className="flex-center gap-4 lg:gap-10 my-5">
            <div className="h-[15vh]">
              <img
                src={product?.mainImage?.url}
                alt=""
                className="h-full w-auto rounded-lg"
              />
            </div>
            <p className="text-lg">{product?.name}</p>
          </div>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="space-y-4"
          >
            {/* Rating */}
            <Form.Item
              name="rating"
              label="Rating"
              rules={[{ required: true, message: "Please select a rating!" }]}
            >
              <Rate className="text-4xl" />
            </Form.Item>

            {/* Comment */}
            <Form.Item
              name="comment"
              label="Comment"
              rules={[{ required: true, message: "Please add a comment!" }]}
            >
              <TextArea rows={4} placeholder="Write your review here..." />
            </Form.Item>

            {/* Submit Button */}
            <Form.Item>
              <Button
                variant="solid"
                color="default"
                htmlType="submit"
                loading={loading}
                size="large"
              >
                {product.reviews?.length > 0
                  ? "Update Review"
                  : "Submit Review"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Card>
    </motion.div>
  );
};

export default ReviewForm;
