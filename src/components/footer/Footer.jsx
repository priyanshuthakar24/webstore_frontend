import React from "react";

import { Divider, Input } from "antd";

const Footer = () => {
  return (
    <>
      <Divider className="border-2 border-[#A9ABBD]" />
      <div className="text-black/55 mt-5  flex justify-evenly mb-10 lg:flex-row flex-col mx-10">
        <div className="flex-center justify-center flex-col gap-5 ">
          <p className="text-black text-4xl font-sans">
            Sign up for our newsletter{" "}
          </p>
          <p className="text-black ">
            Be the first to know about our special offers, new product
            <br /> launches, and events
          </p>
          <Input
            size="large"
            placeholder="Email"
            suffix={"Sign UP"}
            className="rounded-none border-black"
          />
        </div>
        <div className="space-y-1">
          <p className="text-black font-sans text-lg my-5">Shop</p>
          <p className="hover:cursor-pointer hover:underline">Women’s</p>
          <p className="hover:cursor-pointer hover:underline">Men’s</p>
          <p className="hover:cursor-pointer hover:underline">Kids'</p>
          <p className="hover:cursor-pointer hover:underline">Shoes</p>
          <p className="hover:cursor-pointer hover:underline">Equipment</p>
          <p className="hover:cursor-pointer hover:underline">By Activity</p>
          <p className="hover:cursor-pointer hover:underline">Gift Cards</p>
          <p className="hover:cursor-pointer hover:underline">Sale</p>
        </div>
        <div className="space-y-1">
          <p className="text-black font-sans text-lg my-5">Help</p>
          <p className="hover:cursor-pointer hover:underline">Help Center</p>
          <p className="hover:cursor-pointer hover:underline">Order Status</p>
          <p className="hover:cursor-pointer hover:underline">Size Chart</p>
          <p className="hover:cursor-pointer hover:underline">
            Returns & Warranty
          </p>
          <p className="hover:cursor-pointer hover:underline">Contact Us</p>
        </div>
        <div className="space-y-1">
          <p className="text-black font-sans text-lg my-5">About</p>
          <p className="hover:cursor-pointer hover:underline">About Us</p>
          <p className="hover:cursor-pointer hover:underline">Responsibility</p>
          <p className="hover:cursor-pointer hover:underline">
            Technology & Innovation
          </p>
          <p className="hover:cursor-pointer hover:underline">
            Explore our stories
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
