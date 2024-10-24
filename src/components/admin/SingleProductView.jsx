import { Popconfirm, Button, message } from "antd";
import React, { useState } from "react";

const SingleProductView = ({ props }) => {
  return (
    <div>
      <h1
        className="text-2xl font-bold 
lg:text-center editpropsinfo"
      >
        {props.name}
      </h1>
      <div
        className="flex items-end flex-col 
gap-2 "
      >
        <div
          className="flex gap-2 
justify-center items-center 
text-gray-700 capitalize"
        >
          {/* <p
              style={{ background: props.publish ? "#8BE78B" : "red" }}
              className="rounded-full h-3 w-3"
            />
            <p>{props.publish ? "Publish" : "unPublish"}</p> */}
        </div>
        {/* <Switch checked={props.publish} 
style={{ background: props.publish ? 
"green" : "red" }} disabled /> */}
        <br />
      </div>
      <div>
        <div
          className="flex gap-10 
justify-between items-center flex-col 
"
        >
          {props.mainImage && (
            <img
              src={props.mainImage}
              alt={props.name}
              className="border rounded 
shadow-lg h-60"
            />
          )}
          <div className="flex gap-10 ">
            {props.subImages &&
              props.subImages.map((item) => (
                <img
                  src={item}
                  key={item}
                  className="border rounded 
                shadow-lg h-60"
                />
              ))}
          </div>
          <p className="font-bold "> {props.description}</p>
          <div className="flex flex-row gap-5">
            {props.bulletPoints &&
              props.bulletPoints.map((item) => (
                <span className="font-bold">{item}</span>
              ))}
          </div>
        </div>
        <div
          className="mt-5 flex flex-col 
gap-5"
        >
          <p className="capitalize">
            Categories:
            {props.category}
          </p>
          <p>Mrp: {props.mrp}</p>
          <p>SalePrice: {props.salePrice}</p>
          <p>Stock:{props.stock}</p>
          {/* <p> {moment(props.publishedDate).format("MMMM Do, YYYY")}</p> */}
        </div>
      </div>
    </div>
  );
};

export default SingleProductView;
