import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const [isLoadin, setisLoading] = useState(false);
  const [form] = Form.useForm();
  const { token } = useParams();
  const navigate = useNavigate();

  //! Handle form submission
  const handleSubmit = async (values) => {
    const { password, passwordConfirm } = values;
    if (password === passwordConfirm) {
      try {
        setisLoading(true);
        const res = await axios.post(
          `${process.env.REACT_APP_API}/api/auth/reset-password/${token}`,
          { password }
        );
        if (res.status === 200) {
          message.success(res.data.message);
          setisLoading(false);
          navigate("/auth/login");
        }
      } catch (error) {
        message.error(error.response.data.message);
        setisLoading(false);
      }
    } else {
      message.error("Passwords do not match.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="lg:max-w-md w-80 lg:w-full bg-white rounded-lg shadow-2xl overflow-hidden"
      >
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-black">
            Reset Password
          </h2>
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            {/* //! Password field */}
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password",
                },
              ]}
            >
              <Input.Password size="large" placeholder="Password" />
            </Form.Item>

            {/* //! Confirm password field with custom validation */}
            <Form.Item
              name="passwordConfirm"
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Please confirm your password",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("The two passwords do not match")
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                size="large"
                placeholder="Re-enter your Password"
              />
            </Form.Item>

            {/* //! Submit button */}
            <Form.Item>
              <Button
                size="large"
                color="default"
                variant="solid"
                className="w-full"
                htmlType="submit"
                loading={isLoadin}
              >
                Set New Password
              </Button>
            </Form.Item>
          </Form>
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
