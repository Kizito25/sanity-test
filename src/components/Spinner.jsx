import React from "react";
import { Circles } from "react-loader-spinner";

const Spinner = ({ message }) => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <Circles color="#000FFF" height={50} width={200} className="m-5" />
      <p>{message}</p>
    </div>
  );
};

export default Spinner;
