import React from "react";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";
import { Carousel } from "antd";
import shopvideo from "../../assets/video/shop_video.mp4";
const Hero = () => {
  const nav = useNavigate();

  const contentStyle = {
    height: "60vh",
    color: "#000",
    lineHeight: "160px",
    textAlign: "center",
    background: "#C4C4C4",
  };

  // will navigate to shop page
  const handleclick = () => {
    nav("/shop");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center space-y-3  text-black "
    >
      <h1 className="text-5xl mt-28 font-bold font-serif ">
        Better clothing for the Planet
      </h1>
      <p className="text-gray-700 flex flex-col ">
        <span>
          Create screens directly in Method or add your images from Sketch or
        </span>
        <span> Figma. You can even sync designs from your cloud storage!</span>
      </p>
      <motion.button
        whileHover={{ scale: 0.95 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3 }}
        onClick={handleclick}
        type="button"
        className=" border-black border-2  px-14 py-2 "
      >
        Shop All
      </motion.button>
      <div className="flex-center justify-center lg:w-3/4 mx-auto">
        <video
          className="w-[90vw] h-full rounded shadow-lg"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={shopvideo} type="video/mp4" />
        </video>
      </div>
      {/* <Carousel
        autoplay
        arrows
        infinite={true}
        effect="fade"
        className="w-3/4 mx-auto mt-6"
      >
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel> */}
    </motion.div>
  );
};

export default Hero;
