import React from "react";
import moment from "moment";

const FormateDate = ({ timestamp }) => {
  const formattedDate = moment(timestamp).format(
    "dddd, MMMM Do YYYY, h:mm:ss A"
  );
  return <div>{formattedDate}</div>;
};

export default FormateDate;
