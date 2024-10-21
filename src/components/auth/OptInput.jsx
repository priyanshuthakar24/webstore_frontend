import React, { useCallback, useEffect, useRef, useState } from "react";
import { message, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { useAuth } from "../../context/Authcontext";
const OtpInput = () => {
  const { login } = useAuth();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isLoading, setisLoading] = useState(false);
  const inputref = useRef([]);
  const navigate = useNavigate();
  //! whne u put the input than it will check if the input is valid number or not than it will inser in the current position and ove to next box
  const handleChange = (index, value) => {
    let newcode = [...code];
    if (isNaN(value)) return; // Ensure only numbers are allowed

    newcode[index] = value;
    setCode(newcode);
    if (value && index < 5) {
      inputref.current[index + 1].focus();
    }
  };

  // ! when u directly past the 6 digit code
  const handlePaste = (e) => {
    // Handle pasting a 6-digit OTP
    const pastedData = e.clipboardData.getData("text").slice(0, 6).split("");
    if (pastedData.every((char) => !isNaN(char))) {
      setCode([...pastedData, ...Array(6 - pastedData.length).fill("")]);
    }
    e.preventDefault();
  };

  //! when and backspace key press that it will check for the empty boks or remove the previos one
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputref.current[index - 1].focus();
    }
  };

  //! otp submit logic
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const verificationCode = code.join("");
      try {
        setisLoading(true);
        const res = await axios.post(
          `${process.env.REACT_APP_API}/api/auth/verify-email`,
          { code: verificationCode },
          { withCredentials: true }
        );
        if (res.status === 200) {
          message.success(res.data.message);
          login(res.data.user);
          navigate("/");
          setisLoading(false);
        }
      } catch (error) {
        message.error(error.response.data.message);
        setisLoading(false);
      }
    },
    [code, login, navigate]
  );

  //! Auto submit when all fields are filled
  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit(new Event("submit"));
    }
  }, [code, handleSubmit]);

  return (
    <div className=" max-w-md lg:w-full w-[21rem] rounded-lg shadow-lg overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className=" rounded-2xl shadow-2xl lg:p-8 py-8 px-4 lg:w-full max-w-md w-[21rem]"
      >
        <h2 className="text-3xl font-bold mb-6 text-center  text-black ">
          Verify Your Email
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Enter the 6-digit code sent to your email address.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputref.current[index] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-12 h-12 text-center text-2xl font-bold bg-white/5 text-black  border-2 rounded-lg focus:border-gray-600 focus:outline-none"
              />
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isLoading || code.some((digit) => !digit)}
            className="w-full bg-black text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-80"
          >
            {isLoading ? <Spin /> : "Verify Email"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};
export default OtpInput;
