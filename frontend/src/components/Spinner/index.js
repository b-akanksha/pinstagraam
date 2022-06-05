import React from "react";
import { Triangle } from "react-loader-spinner";

function Spinner({ message, type }) {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <Triangle color="#8134af" width={200} className="m-5" />

      <p className="text-lg text-center px-2 m-4" style={{ color: "#8134af" }}>
        {message}
      </p>
    </div>
  );
}

export default Spinner;
