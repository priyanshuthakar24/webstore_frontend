import React from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import login3d from "../../assets/img/login3d.webp";
import { Button, Flex, Form, Input, Typography } from "antd";

const Login = () => {
  const { loading, loginUser } = useLogin();
  const [form] = Form.useForm();
  const handleLogin = async (values) => {
    const email = values.email.toLowerCase();
    await loginUser({ ...values, email });
  };

  return (
    <div className="h-[90vh] flex-center justify-center z-[10]">
      <div className="flex-center justify-center bg-white p-8 gap-5 rounded-xl shadow-lg">
        <Flex vertical flex={1}>
          {/* //! heading section */}
          <Typography.Title level={3} strong>
            Welcome Back,
          </Typography.Title>
          <Typography.Text type="secondary" strong className="mb-8">
            Login with email
          </Typography.Text>
          {/* //! login form */}
          <Form onFinish={handleLogin} layout="vertical">
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
              <Input size="large" placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "please input your Password",
                },
              ]}
            >
              <Input.Password size="large" placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Button
                color="default"
                variant="solid"
                size="large"
                htmlType="submit"
                className="w-full"
                loading={loading}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
          {/* //! Forget-password Link */}
          <span className="text-center mb-2 text-gray-500">
            <Link to="/auth/forgot-password" className="hover:underline">
              Forget Password?
            </Link>
          </span>
          <div className="text-center text-gray-600">
            <span>
              Don't have an account?&nbsp;
              <Link to="/auth/signup" className="text-gray-600">
                <span className="text-blue-500 hover:underline">Register</span>
              </Link>
            </span>
          </div>
        </Flex>
        {/* //! side image link */}
        <Flex flex={1} className="hidden lg:block">
          <img src={login3d} className="max-w-full" alt="Login illustration" />
        </Flex>
      </div>
    </div>
  );
};

export default Login;
