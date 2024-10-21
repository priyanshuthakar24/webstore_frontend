import React, { useState } from "react";
import { Mail } from "lucide-react";
import { motion } from "framer-motion";
import { Button, Form, Input, message } from "antd";
import axios from "axios";
const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  //! hadnle submit logic
  const handleSubmit = async ({ email }) => {
    try {
      setisLoading(true);
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/auth/forgot-password`,
        { email },
        { withCredentials: true }
      );
      if (res.status === 200) {
        message.success(res.data.message);
        setEmail(email);
        setIsSubmitted(true);
        setisLoading(false);
      }
    } catch (error) {
      message.error(error.response.data.message);
      setisLoading(false);
    } finally {
      setisLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="lg:max-w-md w-80 lg:w-full bg-white   rounded-lg shadow-2xl overflow-hidden"
      >
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-black">
            Forgot Password
          </h2>

          {!isSubmitted ? (
            <Form onFinish={handleSubmit}>
              <p className="text-gray-500 mb-6 text-center">
                Enter your email address and we'll send you a link to reset your
                password.
              </p>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "please input full email",
                  },
                  {
                    type: "email",
                    message: "The input is not valid Email!",
                  },
                ]}
              >
                <Input
                  placeholder="Email Addresss"
                  size="large"
                  className="rounded"
                />
              </Form.Item>
              <Button
                color="default"
                variant="solid"
                size="large"
                htmlType="submit"
                className="w-full"
                loading={isLoading}
              >
                Submit
              </Button>
            </Form>
          ) : (
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Mail className="h-8 w-8 text-white" />
              </motion.div>
              <p className="text-gray-600 mb-6">
                If an account exists for {email}, you will receive a password
                reset link shortly.
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;
